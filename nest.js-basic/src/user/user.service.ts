import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { Session } from 'src/admin/models/session.model';
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SessionService } from 'src/session/session.service';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Session.name) private sessionModel: Model<Session>,
    private sessionService: SessionService,
    private configService: ConfigService
  ) { }

  async validateSession(token: string): Promise<any> {
    return this.sessionService.validateSession(token);
  }

  async validateUserSession(token: string): Promise<any> {
    return this.sessionService.validateUserSession(token);
  }

  // Signup a new user
  async create(userData: SignupUserDto): Promise<User> {
    const newUser = new this.userModel(userData);
    if (newUser) {
      const hashedPassword = await bcrypt.hash(this.configService.get<string>(newUser.password), 10);

      const userData = {
        email: newUser.email,
        password: hashedPassword
      };
      return newUser.save();
    }
  }

  // Login user
  async login(email: string, loginUserDto: LoginUserDto): Promise<User> {
    return this.userModel.findOne({ email });
  }

  // Create session
  async createSession(user_id: ObjectId, session_token: string): Promise<Session> {
    const newSession = new this.sessionModel({
      user_id,
      session_token
    });
    return newSession.save();
  }

  // Get all users
  async findAll(): Promise<User[]> {
    return this.userModel.find().sort({ created_at: -1 }).exec();
  }

  // Find a user by ID
  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  // Update a user
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  // Delete a user
  remove(id: string): Promise<any> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}