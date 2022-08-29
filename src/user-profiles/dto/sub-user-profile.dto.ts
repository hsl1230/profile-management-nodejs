import { PrimaryUserProfileDto } from './primary-user-profile.dto';
import { ApiProperty } from '@nestjs/swagger';
import { BaseUserProfileDto } from './base-user-profile.dto';

export class SubUserProfileDto extends BaseUserProfileDto {
  @ApiProperty({
    description: 'primary user profile of the sub user profile',
    type: PrimaryUserProfileDto,
    title: 'primary user profile',
    required: true,
  })
  primaryUserProfile: PrimaryUserProfileDto;
}
