import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SessionService } from 'src/session/session.service';
import { Model } from 'mongoose';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<Role>,
    private sessionService: SessionService,
  ) { }

  async validateSession(token: string): Promise<any> {
    return this.sessionService.validateSession(token);
  }

  async validateUserSession(token: string): Promise<any> {
    return this.sessionService.validateUserSession(token);
  }

  // Create a new role
  async create(roleData: CreateRoleDto): Promise<Role> {
    const newRole = new this.roleModel(roleData);
    return newRole.save();
  }

  // Get all roles
  async findAll(): Promise<Role[]> {
    return this.roleModel.find().sort({ created_at: -1 }).exec();
  }

  // Find a role by ID
  async findOne(id: string): Promise<Role> {
    return this.roleModel.findById(id).exec();
  }

  // Update a role
  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    return this.roleModel.findByIdAndUpdate(id, updateRoleDto, { new: true }).exec();
  }

  // Delete a role
  remove(id: string): Promise<any> {
    return this.roleModel.findByIdAndDelete(id).exec();
  }
}