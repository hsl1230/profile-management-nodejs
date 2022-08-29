import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty()
  verticalId: string;

  @ApiProperty()
  roleName: string;

  @ApiProperty({ required: false })
  primaryUserProfileId?: string;
}
