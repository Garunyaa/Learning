import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionService } from './session.service';
import { Session, SessionSchema } from '../admin/models/session.model';
import {Admin, AdminSchema} from '../admin/models/admin.model';
import {User, UserSchema} from '../user/entities/user.entity';
import { Role, RoleSchema } from '../role/entities/role.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  providers: [SessionService],
  exports: [SessionService]
})
export class SessionModule {}