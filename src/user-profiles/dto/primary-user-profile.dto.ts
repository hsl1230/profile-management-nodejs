import { ApiProperty } from '@nestjs/swagger';
import { HomeAddressDto } from './home-address.dto';
import { BaseUserProfileDto } from './base-user-profile.dto';

export class PrimaryUserProfileDto extends BaseUserProfileDto {
  @ApiProperty()
  homeAddress: HomeAddressDto;
}
