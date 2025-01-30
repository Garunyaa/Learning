import { Controller, Post, Get, Param, Body, Patch, Delete, Headers, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseHandler } from '../utils/response.handler';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongoose';

@Controller('api/v1')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }

  @Post('user/signup')
  async create(@Body() createUserDto: SignupUserDto, @Res() res: Response) {
    try {
      const user = await this.userService.create(createUserDto);

      if (!user) {
        return ResponseHandler.errorResponse(res, {}, 'User creation failed', 400);
      }
      return ResponseHandler.successResponse(res, user, 'User signed up successfully', 200);
    } catch (error) {
      return ResponseHandler.errorResponse(res, error, error.message, 500);
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const { email, password } = loginUserDto;

    try {
      const user = await this.userService.login(email, loginUserDto);
      if (!user) {
        return ResponseHandler.errorResponse(res, {}, 'Invalid email', 400);
      }

      // Compare the password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return ResponseHandler.errorResponse(res, {}, 'Invalid password', 400);
      }

      // Generate JWT token
      const payload = { email: user.email };
      const token = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      // Create a new session
      await this.userService.createSession(user._id as ObjectId, token);
      const userObj = user.toObject();
      delete userObj.password;
      return ResponseHandler.successResponse(res, { user: userObj, session_token: token }, 'User logged in successfully', 200);
    } catch (error) {
      return ResponseHandler.errorResponse(res, error, error.message, 500);
    }
  }

  @Get()
  async findAll(@Headers('Authorization') token: string, @Res() res: Response) {
    try {
      await this.userService.validateSession(token);

      const users = await this.userService.findAll();

      if (!users) {
        return ResponseHandler.successResponse(res, {}, 'No users found', 200);
      }
      return ResponseHandler.successResponse(res, users, 'Users fetched successfully', 200);
    } catch (error) {
      return ResponseHandler.errorResponse(res, error, error.message, 500);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Headers('Authorization') token: string, @Res() res: Response) {
    try {
      await this.userService.validateSession(token);

      const user = await this.userService.findOne(id);

      if (!user) {
        return ResponseHandler.errorResponse(res, {}, 'User not found', 400);
      }
      return ResponseHandler.successResponse(res, user, 'User details fetched successfully', 200);
    } catch (error) {
      return ResponseHandler.errorResponse(res, error, error.message, 500);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Headers('Authorization') token: string, @Res() res: Response) {
    try {
      await this.userService.validateSession(token);

      const user = await this.userService.update(id, updateUserDto);

      if (!user) {
        return ResponseHandler.errorResponse(res, {}, 'User not found', 400);
      }
      return ResponseHandler.successResponse(res, user, 'User details updated successfully', 200);
    } catch (error) {
      return ResponseHandler.errorResponse(res, error, error.message, 500);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Headers('Authorization') token: string, @Res() res: Response) {
    try {
      await this.userService.validateSession(token);

      const user = await this.userService.remove(id);

      if (!user) {
        return ResponseHandler.errorResponse(res, {}, 'User not found', 400);
      }
      return ResponseHandler.successResponse(res, {}, 'User deleted successfully', 200);
    } catch (error) {
      return ResponseHandler.errorResponse(res, error, error.message, 500);
    }
  }
}