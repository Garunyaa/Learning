import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from './entities/user.entity';
import { Admin, AdminSchema } from 'src/admin/models/admin.model';
import { Session, SessionSchema } from 'src/admin/models/session.model';
import { SessionModule } from 'src/session/session.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    SessionModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
