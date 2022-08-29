import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { GrantPermissionsRequestDto } from './dto/grant-permissions-request.dto';
import { AssignRoleRequestDto } from './dto/assign-role-request.dto';
import { PermissionDto } from './dto/permission.dto';
import { RoleDto } from './dto/role.dto';
import { AddRoleRequestDto } from './dto/add-role-request.dto';

@ApiTags('Access Management Service')
@ApiHeader({
  name: 'correlation-id',
  description: `
  A Correlation ID is a unique, randomly generated identifier value that is added to every request and response. 
  In a microservice architecture, the initial Correlation ID is passed to your sub-processes. 
  If a sub-system also makes sub-requests, it will also pass the Correlation ID to those systems.
  It is used to keep track of requests and responses processed by multiple systems.
  `,
})
@Controller('accesses')
export class PermissionsController {
  @ApiOperation({
    summary: 'grant permissions to the role',
    description: `
      the vertical of the role and the permissions should be the same.
      permissions can be granted to the predefined roles by the system for the recourse type of "device class" or "system".
      
      Declare <Who>
        predefined Role
      is allowed to use <a feature/action> 
        Any feature
        Watch live stream
        Zoom in/out 
        Unlock the door
        Adjust the temperature
      of <a resource> 
        Any device
        Device group / Device class?
        The lock
        The camera
        The light
        The System
      in which <period of time> 
        Any time
        From 9am to 5pm
      in which <period of date> 
        Any Date
        Every Monday, Wednesday, Friday
        Every 1, 2, 21
      effective from <start date> to <end date>`,
  })
  @ApiParam({
    name: 'roleName',
    required: true,
    description: 'role name',
  })
  @ApiParam({
    name: 'verticalId',
    required: true,
    description: 'vertical Id',
  })
  @ApiCreatedResponse()
  @Put('permissions/roles/:roleName/:verticalId')
  grantPermissionsToPredefinedRole(
    @Body() permissions: GrantPermissionsRequestDto,
    @Param('roleName') roleName,
    @Param('verticalId') verticalId,
  ) {
    // ToDo
  }

  @ApiOperation({
    summary: 'grant permissions to the role',
    description: `
      the vertical of the role and the permissions should be the same.
      permissions can be granted to the predefined roles and self-defined roles by the primary user profile.
      
      Declare <Who>
        predefined role on the primary user profile
        self-defined role by the primary user profile
      is allowed to use <a feature/action> 
        Any feature
        Watch live stream
        Zoom in/out 
        Unlock the door
        Adjust the temperature
      of <a resource> 
        Any device
        Device group / Device class?
        The lock
        The camera
        The light
        The System
      in which <period of time> 
        Any time
        From 9am to 5pm
      in which <period of date> 
        Any Date
        Every Monday, Wednesday, Friday
        Every 1, 2, 21
      effective from <start date> to <end date>`,
  })
  @ApiParam({
    name: 'primaryUserProfileId',
    required: true,
    description: 'primary user profile id',
  })
  @ApiParam({
    name: 'roleName',
    required: true,
    description: 'role name',
  })
  @ApiParam({
    name: 'verticalId',
    required: true,
    description: 'vertical Id',
  })
  @ApiCreatedResponse()
  @Put('permissions/:primaryUserProfileId/roles/:roleName/:verticalId')
  grantPermissionsToRole(
    @Body() permissions: GrantPermissionsRequestDto,
    @Param('primaryUserProfileId') primaryUserProfileId,
    @Param('roleName') roleName,
    @Param('verticalId') verticalId,
  ) {
    // ToDo
  }

  @ApiOperation({
    summary: 'grant permissions to the sub user profile',
    description: `
      permissions can be granted to the user directly.
      
      Declare <Who>
        sub user profile
      is allowed to use <a feature/action> 
        Any feature
        Watch live stream
        Zoom in/out 
        Unlock the door
        Adjust the temperature
      of <a resource> 
        Any device
        Device group / Device class?
        The lock
        The camera
        The light
        The System
      in which <period of time> 
        Any time
        From 9am to 5pm
      in which <period of date> 
        Any Date
        Every Monday, Wednesday, Friday
        Every 1, 2, 21
      effective from <start date> to <end date>`,
  })
  @ApiParam({
    name: 'subUserProfileId',
    required: true,
    description: 'sub user profile id',
  })
  @ApiCreatedResponse()
  @Put('permissions/:subUserProfileId')
  grantPermissionsToSubUserProfile(
    @Body() permissions: GrantPermissionsRequestDto,
    @Param('subUserProfileId') subUserProfileId,
  ) {
    // ToDo
  }

  @ApiOperation({
    summary: 'assign a role to the sub user profile',
    description:
      'a role can be predefined roles for each vertical, or self-defined ones by an owner.',
  })
  @ApiParam({
    name: 'subUserProfileId',
    required: true,
    description: 'id of the sub user profile',
  })
  @ApiOkResponse()
  @Put('role/:subUserProfileId')
  assignRoleToSubUserProfile(
    @Body() assignRoleRequest: AssignRoleRequestDto,
    @Param('subUserProfileId') subUserProfileId,
  ) {
    // TODO
  }

  @ApiOperation({
    summary:
      'revoke permissions related to the vertical from the sub user profile',
    description:
      'this will make the sub user profile not be able to access the vertical. it will revoke all the permissions granted to the role and directly to the user.',
  })
  @ApiParam({
    name: 'subUserProfileId',
    required: true,
    description: 'id of the sub user profile',
  })
  @ApiParam({
    name: 'verticalId',
    required: true,
    description: 'id of the vertical',
  })
  @ApiOkResponse()
  @Delete('permissions/:subUserProfileId/:verticalId')
  revokeAccessToSubUserProfile(
    @Param('subUserProfileId') subUserProfileId,
    @Param('verticalId') verticalId,
  ) {
    // TODO
  }

  @ApiOperation({
    summary: 'get permissions of the vertical granted to the sub user profile',
    description:
      'include all permissions of the vertical based on role and user.',
  })
  @ApiParam({
    name: 'subUserProfileId',
    required: true,
    description: 'id of the sub user profile',
  })
  @ApiParam({
    name: 'verticalId',
    required: true,
    description: 'id of the vertical',
  })
  @ApiOkResponse({ type: PermissionDto, isArray: true })
  @Get('permissions/:subUserProfileId/:verticalId')
  getPermissions(
    @Param('subUserProfileId') subUserProfileId,
    @Param('verticalId') verticalId,
    @Query('deviceId') deviceId,
  ): PermissionDto[] {
    const permissions: PermissionDto[] = [];
    return permissions;
  }

  @ApiOperation({
    summary: 'Add a predefined role to the vertical',
    description: 'it will be defined by system administrators only.',
  })
  @ApiCreatedResponse()
  @Post('roles')
  addPredefinedRole(@Body() addRoleRequest: AddRoleRequestDto) {
    // TODO
  }

  @ApiOperation({
    summary: 'Add a self-defined role to the vertical',
    description: 'it will be defined by owners.',
  })
  @ApiParam({
    name: 'primaryUserProfileId',
    required: true,
    description: 'id of the primary user profile',
  })
  @ApiCreatedResponse()
  @Post(':primaryUserProfileId/roles')
  addSelfDefinedRole(
    @Body() addRoleRequest: AddRoleRequestDto,
    @Param('primaryUserProfileId') primaryUserProfileId,
  ) {
    // TODO
  }

  @ApiOperation({
    summary: 'get available roles of the primary user profile id',
    description: `roles that can be assigned to sub user profiles of the primary user profile.
      including predefined roles and self-defined ones.`,
  })
  @ApiParam({
    name: 'primaryUserProfileId',
    required: true,
    description: 'id of the primary user profile',
  })
  @ApiOkResponse({ type: RoleDto, isArray: true })
  @Get('roles/:primaryUserProfileId')
  getRoles(): RoleDto[] {
    const roles: RoleDto[] = [];
    return roles;
  }
}
