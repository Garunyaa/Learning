import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from 'src/admin/models/session.model';
import { Admin } from 'src/admin/models/admin.model';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SessionService {
    constructor(
        @InjectModel(Session.name) private sessionModel: Model<Session>,
        @InjectModel(Admin.name) private adminModel: Model<Admin>,
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
    ) { }

    async createSession(userId: string, token: string) {
        // Create a session
        const session = new this.sessionModel({
            user_id: userId,
            session_token: token
        });

        await session.save();
        console.log('Session created successfully');
    }

    async validateSession(token: string): Promise<Admin> {
        try {
            const decoded = this.jwtService.verify(token);
            const session = await this.sessionModel.findOne({ session_token: token });

            if (!session) {
                throw new Error('Invalid session token');
            }

            const admin = await this.adminModel.findOne({ email: decoded.email });
            if (!admin) {
                throw new Error('Admin not found');
            }

            return admin;
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }

    async validateUserSession(token: string): Promise<User> {
        try {
            const decoded = this.jwtService.verify(token);
            const session = await this.sessionModel.findOne({ session_token: token });

            if (!session) {
                throw new Error('Invalid session token');
            }

            const user = await this.userModel.findOne({ email: decoded.email });
            if (!user) {
                throw new Error('User not found');
            }

            return user;
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
}