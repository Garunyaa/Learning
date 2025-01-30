import { Controller, Post, Body, Res } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ObjectId } from 'mongoose';
import { ResponseHandler } from 'src/utils/response.handler';
import { LoginAdminDto } from './validations/login.admin.validator';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Controller('api/v1/admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  @Post('login')
  async login(@Body() loginAdminDto: LoginAdminDto, @Res() res: Response) {
    const { email, password } = loginAdminDto;

    try {
      const admin = await this.adminService.login(email, loginAdminDto);
      if (!admin) {
        return ResponseHandler.errorResponse(res, {}, 'Invalid email', 400);
      }

      // Compare the password
      const passwordMatch = await bcrypt.compare(password, admin.password);
      if (!passwordMatch) {
        return ResponseHandler.errorResponse(res, {}, 'Invalid password', 400);
      }

      // Generate JWT token
      const payload = { email: admin.email };
      const token = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      // Create a new session
      await this.adminService.createSession(admin._id as ObjectId, token);
      const adminObj = admin.toObject();
      delete adminObj.password;
      return ResponseHandler.successResponse(res, { admin: adminObj, session_token: token }, 'Admin logged in successfully', 200);
    } catch (error) {
      return ResponseHandler.errorResponse(res, error, error.message, 500);
    }
  }
}