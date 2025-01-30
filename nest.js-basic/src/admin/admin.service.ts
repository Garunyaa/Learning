import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Admin } from './models/admin.model';
import { Session } from './models/session.model';
import { ConfigService } from '@nestjs/config';
import { LoginAdminDto } from './validations/login.admin.validator';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService implements OnModuleInit {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    @InjectModel(Session.name) private sessionModel: Model<Session>,
    private configService: ConfigService
  ) { }

  async onModuleInit() {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');

    // Check if the admin already exists
    const existingAdmin = await this.adminModel.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(this.configService.get<string>('ADMIN_PASSWORD'), 10);

      const adminData = {
        email: adminEmail,
        password: hashedPassword
      };

      const newAdmin = new this.adminModel(adminData);
      await newAdmin.save();
      console.log('Admin created successfully');
    } else {
      console.log('Admin already exists');
    }
  }

  // Login admin
  async login(email: string, loginAdminDto: LoginAdminDto): Promise<Admin> {
    return this.adminModel.findOne({ email });
  }

  // Create session
  async createSession(user_id: ObjectId, session_token: string): Promise<Session> {
    const newSession = new this.sessionModel({
      user_id,
      session_token
    });
    return newSession.save();
  }
}