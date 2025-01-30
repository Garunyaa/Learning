import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { JwtModule } from '@nestjs/jwt';
import { Role, RoleSchema } from './entities/role.entity';
import { Admin, AdminSchema } from 'src/admin/models/admin.model';
import { Session, SessionSchema } from 'src/admin/models/session.model';
import { SessionModule } from 'src/session/session.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    SessionModule,
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule { }
