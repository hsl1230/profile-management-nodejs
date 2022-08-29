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
  getSchemaPath,
  refs,
} from '@nestjs/swagger';
import { PrimaryUserProfileDto } from './dto/primary-user-profile.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import { CreatePrimaryUserProfileRequestDto } from './dto/create-primary-user-profile-request.dto';
import { AddSkusRequestDto } from './dto/add-skus-request.dto';
import { SkuDto } from './dto/sku.dto';
import { CreateSubUserProfileRequestDto } from './dto/create-sub-user-profile-request.dto';
import { BaseUserProfileDto } from './dto/base-user-profile.dto';
import { UpdateHomeAddressRequestDto } from './dto/update-home-address-request.dto';
import { UpdateUserProfileRequestDto } from './dto/update-user-profile-request.dto';
import { BindMyTelusIdRequestDto } from './dto/bind-my-telus-id-request.dto';
import { SetNotificationMethodsRequestDto } from './dto/set-notification-methods-request.dto';
import { SetNotificationStatusRequestDto } from './dto/set-notification-status-request.dto';
import { SubUserProfileDto } from './dto/sub-user-profile.dto';

@ApiTags('User Profile Management Service')
@ApiHeader({
  name: 'correlation-id',
  description: `
  A Correlation ID is a unique, randomly generated identifier value that is added to every request and response. 
  In a microservice architecture, the initial Correlation ID is passed to your sub-processes. 
  If a sub-system also makes sub-requests, it will also pass the Correlation ID to those systems.
  It is used to keep track of requests and responses processed by multiple systems.
  `,
})
@Controller('user-profiles')
export class UserProfilesController {
  @ApiOperation({
    summary: 'get a list of user profiles related to the specified myTelusId',
    description:
      'a list mixing of primary user profiles and sub user profiles.',
  })
  @ApiParam({
    name: 'myTelusId',
    required: true,
    description: 'MyTelus user id',
  })
  @ApiOkResponse({
    schema: {
      type: 'array',
      items: {
        anyOf: refs(PrimaryUserProfileDto, SubUserProfileDto),
        // oneOf: [
        //   { $ref: getSchemaPath(PrimaryUserProfileDto) },
        //   { $ref: getSchemaPath(SubUserProfileDto) },
        // ],
      },
    },
  })
  @Get(':myTelusId')
  getUserProfilesByMyTelusId(@Param('myTelusId') myTelusId): UserProfileDto[] {
    const userProfiles: UserProfileDto[] = [];
    return userProfiles;
  }

  @ApiOperation({
    summary:
      'get a list of primary user profiles related to the specified myTelusId',
    description: 'including the home addresses owned by the customer.',
  })
  @ApiParam({
    name: 'myTelusId',
    required: true,
    description: 'MyTelus user id',
  })
  @ApiOkResponse({ type: PrimaryUserProfileDto, isArray: true })
  @Get('primary-user-profiles/:myTelusId')
  getPrimaryUserProfilesByMyTelusId(
    @Param('myTelusId') myTelusId,
  ): PrimaryUserProfileDto[] {
    const userProfiles: PrimaryUserProfileDto[] = [];
    return userProfiles;
  }

  @ApiOperation({
    summary: 'Create a primary user profile with home address',
    description:
      'create the primary user profile and home address at the same time. the primary user profile will be the owner of all verticals of the same home address',
  })
  @ApiCreatedResponse({ type: PrimaryUserProfileDto, isArray: false })
  @Post('primary-user-profiles')
  createPrimaryUserProfileWithHomeAddress(
    @Body() createPrimaryUserProfileRequest: CreatePrimaryUserProfileRequestDto,
  ): PrimaryUserProfileDto {
    return new PrimaryUserProfileDto();
  }

  @ApiOperation({
    summary: 'update home address of the primary user profile',
    description:
      'home address and primary user profile has a one one relationship, so primaryUserProfileId can be used to identify a home address.',
  })
  @ApiParam({
    name: 'primaryUserProfileId',
    required: true,
    description: 'id of the primary user profile',
  })
  @ApiOkResponse()
  @Put('primary-user-profiles/:primaryUserProfileId/home-address')
  updateHomeAddress(
    @Body() updateHomeAddressRequest: UpdateHomeAddressRequestDto,
  ) {
    // TODO
  }

  // @ApiOperation({
  //   summary: 'add multiple SKUs to the primary user profile',
  //   description: `
  //     one or more SKUs can be added to an home address at the same time 
  //     in case a package which includes multiple SKUs is subscribed.
  //     SKUs in a package can be of different verticals.`,
  // })
  // @ApiParam({
  //   name: 'primaryUserProfileId',
  //   required: true,
  //   description: 'id of the primary user profile',
  // })
  // @ApiOkResponse()
  // @Put('primary-user-profiles/:primaryUserProfileId/skus')
  // addSku(
  //   @Body() addSkusRequest: AddSkusRequestDto,
  //   @Param('primaryUserProfileId') primaryUserProfileId,
  // ) {
  //   // TODO
  // }

  // @ApiOperation({
  //   summary: 'get a list of SKUs subscribed under the primary user profile',
  //   description:
  //     'a list of SKUs of the vertical of the home address related to the primary user profile.',
  // })
  // @ApiParam({
  //   name: 'primaryUserProfileId',
  //   required: true,
  //   description: 'id of the primary user profile',
  // })
  // @ApiOkResponse({ type: SkuDto, isArray: true })
  // @Get('primary-user-profiles/:primaryUserProfileId/skus')
  // getVerticalSkus(
  //   @Param('primaryUserProfileId') primaryUserProfileId,
  //   @Query('verticalId') verticalId,
  // ): SkuDto[] {
  //   const skus: SkuDto[] = [];
  //   return skus;
  // }

  @ApiOperation({
    summary: 'Create a sub user profile',
    description: 'the sub user profile will be shared by all verticals.',
  })
  @ApiParam({
    name: 'primaryUserProfileId',
    required: true,
    description: 'id of the primary user profile',
  })
  @ApiCreatedResponse({ type: BaseUserProfileDto, isArray: false })
  @Post('primary-user-profiles/:primaryUserProfileId/sub-user-profiles')
  createSubUserProfile(
    @Body() createSubUserProfileRequest: CreateSubUserProfileRequestDto,
    @Param('primaryUserProfileId') primaryUserProfileId,
  ): BaseUserProfileDto {
    return new BaseUserProfileDto();
  }

  @ApiOperation({
    summary: 'get a list of sub user profile of the primary user profile',
  })
  @ApiParam({
    name: 'primaryUserProfileId',
    required: true,
    description: 'id of the primary user profile',
  })
  @ApiOkResponse({ type: BaseUserProfileDto, isArray: true })
  @Get('primary-user-profiles/:primaryUserProfileId/sub-user-profiles')
  getSubUserProfiles(
    @Param('primaryUserProfileId') primaryUserProfileId,
  ): BaseUserProfileDto[] {
    const subUserProfiles: BaseUserProfileDto[] = [];
    return subUserProfiles;
  }

  @ApiOperation({
    deprecated: true,
    summary: 'get a sub user profile',
    description:
      'This endpoint is used to generate the schema of SubUserProfileDto',
  })
  @ApiParam({
    name: 'subUserProfileId',
    required: true,
    description: 'id of the sub user profile',
  })
  @ApiOkResponse({ type: SubUserProfileDto })
  @Get('sub-user-profiles/:subUserProfileId')
  getSubUserProfile(
    @Param('subUserProfileId') subUserProfileId,
  ): SubUserProfileDto {
    return new SubUserProfileDto();
  }

  @ApiOperation({
    summary: 'bind a myTelusId with the sub user profile',
    description: 'it can be called when an invitee accepts an invitation.',
  })
  @ApiParam({
    name: 'subUserProfileId',
    required: true,
    description: 'id of the sub user profile',
  })
  @ApiOkResponse()
  @Put('sub-user-profiles/:subUserProfileId')
  bindMyTelusId(
    @Body() bindMyTelusIdRequest: BindMyTelusIdRequestDto,
    @Param('subUserProfileId') subUserProfileId,
  ) {
    // TODO
  }

  @ApiOperation({
    summary: 'remove the sub user profile from all verticals',
    description: 'just mark the status as DELETED.',
  })
  @ApiParam({
    name: 'subUserProfileId',
    required: true,
    description: 'id of the sub user profile',
  })
  @ApiOkResponse()
  @Delete('sub-user-profiles/:subUserProfileId')
  removeSubUserProfile(@Param('subUserProfileId') subUserProfileId) {
    // TODO
  }

  @ApiOperation({
    summary: 'update a primary / sub user profile',
    description:
      'the same endpoint can be used to update the primary user profile and sub user profile.',
  })
  @ApiParam({
    name: 'userProfileId',
    required: true,
    description: 'can be id of a primary as well as sub user profile',
  })
  @ApiOkResponse({ type: BaseUserProfileDto, isArray: false })
  @Put(':userProfileId')
  updateUserProfile(
    @Body() updateUserProfileRequest: UpdateUserProfileRequestDto,
    @Param('userProfileId') userProfileId,
  ): BaseUserProfileDto {
    return new BaseUserProfileDto();
  }

  @ApiOperation({
    summary:
      'set notification status of all verticals for the primary/sub user profile',
  })
  @ApiParam({
    name: 'userProfileId',
    required: true,
    description: 'can be id of a primary as well as sub user profile',
  })
  @ApiOkResponse()
  @Put(':userProfileId/notification-status')
  setNotificationStatus(
    @Body() setNotificationStatusRequest: SetNotificationStatusRequestDto,
    @Param('userProfileId') userProfileId,
  ) {
    // TODO
  }

  @ApiOperation({
    summary:
      'set notification methods of all verticals for the primary/sub user profile',
  })
  @ApiParam({
    name: 'userProfileId',
    required: true,
    description: 'can be id of a primary as well as sub user profile',
  })
  @ApiOkResponse()
  @Put(':userProfileId/notification-methods')
  setNotificationMethods(
    @Body() setNotificationMethodsRequest: SetNotificationMethodsRequestDto,
    @Param('userProfileId') userProfileId,
  ) {
    // TODO
  }

  @ApiOperation({
    summary:
      'get notification methods of all verticals for the primary/sub user profile',
  })
  @ApiParam({
    name: 'userProfileId',
    required: true,
    description: 'can be id of a primary as well as sub user profile',
  })
  @ApiOkResponse({ type: String, isArray: true })
  @Get(':userProfileId/notification-methods')
  getNotificationMethods(@Param('userProfileId') userProfileId): string[] {
    const notificationMethods: string[] = [];
    return notificationMethods;
  }

  @ApiOperation({
    summary:
      'set notification methods of the vertical for the primary/sub user profile',
  })
  @ApiParam({
    name: 'userProfileId',
    required: true,
    description: 'can be id of a primary as well as sub user profile',
  })
  @ApiParam({
    name: 'verticalId',
    required: true,
    description: 'id of the vertical',
  })
  @ApiOkResponse()
  @Put(':userProfileId/notification-methods/:verticalId')
  setVerticalNotificationMethods(
    @Body() setNotificationMethodsRequest: SetNotificationMethodsRequestDto,
    @Param('userProfileId') userProfileId,
    @Param('verticalId') verticalId,
  ) {
    // TODO
  }

  @ApiOperation({
    summary:
      'get notification methods of all verticals for the primary/sub user profile',
  })
  @ApiParam({
    name: 'userProfileId',
    required: true,
    description: 'can be id of a primary as well as sub user profile',
  })
  @ApiParam({
    name: 'verticalId',
    required: true,
    description: 'id of the vertical',
  })
  @ApiOkResponse({ type: String, isArray: true })
  @Get(':userProfileId/notification-methods/:verticalId')
  getVerticalNotificationMethods(
    @Param('userProfileId') userProfileId,
    @Param('verticalId') verticalId,
  ): string[] {
    const notificationMethods: string[] = [];
    return notificationMethods;
  }
}
