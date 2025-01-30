import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Admin, AdminSchema } from './models/admin.model';
import { Session, SessionSchema } from './models/session.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
    ConfigModule.forRoot(),
    JwtModule.register({}),
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}