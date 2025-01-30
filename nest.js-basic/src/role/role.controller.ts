import { Controller, Post, Get, Param, Body, Patch, Delete, Headers, Res } from '@nestjs/common';
import { Response } from 'express';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ResponseHandler } from '../utils/response.handler';;

@Controller('api/v1')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post('admin/roles')
  async create(@Body() createRoleDto: CreateRoleDto, @Headers('Authorization') token: string, @Res() res: Response) {
    try {
      await this.roleService.validateSession(token);

      const role = await this.roleService.create(createRoleDto);

      if (!role) {
        return ResponseHandler.errorResponse(res, {}, 'Role creation failed', 400);
      }
      return ResponseHandler.successResponse(res, role, 'Role created successfully', 200);
    } catch (error) {
      return ResponseHandler.errorResponse(res, error, error.message, 500);
    }
  }

  @Get('admin/roles')
  async findAll(@Headers('Authorization') token: string, @Res() res: Response) {
    try {
      await this.roleService.validateSession(token);

      const roles = await this.roleService.findAll();

      if (!roles) {
        return ResponseHandler.successResponse(res, [], 'No roles found', 200);
      }
      return ResponseHandler.successResponse(res, roles, 'Roles fetched successfully', 200);
    } catch (error) {
      return ResponseHandler.errorResponse(res, error, error.message, 500);
    }
  }

  @Get('admin/roles/:id')
  async findOne(@Param('id') id: string, @Headers('Authorization') token: string, @Res() res: Response) {
    try {
      await this.roleService.validateSession(token);

      const role = await this.roleService.findOne(id);

      if (!role) {
        return ResponseHandler.errorResponse(res, {}, 'Role not found', 400);
      }
      return ResponseHandler.successResponse(res, role, 'Role details fetched successfully', 200);
    } catch (error) {
      return ResponseHandler.errorResponse(res, error, error.message, 500);
    }
  }

  @Get('user/roles')
  async list(@Headers('Authorization') token: string, @Res() res: Response) {
    try {
      await this.roleService.validateUserSession(token);

      const roles = await this.roleService.findAll();

      if (!roles) {
        return ResponseHandler.successResponse(res, [], 'No roles found', 200);
      }
      return ResponseHandler.successResponse(res, roles, 'Roles fetched successfully', 200);
    } catch (error) {
      return ResponseHandler.errorResponse(res, error, error.message, 500);
    }
  }

  @Get('user/roles/:id')
  async findById(@Param('id') id: string, @Headers('Authorization') token: string, @Res() res: Response) {
    try {
      await this.roleService.validateUserSession(token);

      const role = await this.roleService.findOne(id);

      if (!role) {
        return ResponseHandler.errorResponse(res, {}, 'Role not found', 400);
      }
      return ResponseHandler.successResponse(res, role, 'Role details fetched successfully', 200);
    } catch (error) {
      return ResponseHandler.errorResponse(res, error, error.message, 500);
    }
  }

  @Patch('admin/roles/:id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto, @Headers('Authorization') token: string, @Res() res: Response) {
    try {
      await this.roleService.validateSession(token);

      const role = await this.roleService.update(id, updateRoleDto);

      if(!role) {
        return ResponseHandler.errorResponse(res, {}, 'Role not found', 400);
      }
      return ResponseHandler.successResponse(res, role, 'Role updated successfully', 200);
    } catch (error) {
      return ResponseHandler.errorResponse(res, error, error.message, 500);
    }
  }

  @Delete('admin/roles/:id')
  async remove(@Param('id') id: string, @Headers('Authorization') token: string, @Res() res: Response) {
    try {
      await this.roleService.validateSession(token);

      const role = await this.roleService.remove(id);

      if(!role) {
        return ResponseHandler.errorResponse(res, {}, 'Role not found', 400);
      }
      return ResponseHandler.successResponse(res, {}, 'Role deleted successfully', 200);
    } catch (error) {
      return ResponseHandler.errorResponse(res, error, error.message, 500);
    }
  }
}