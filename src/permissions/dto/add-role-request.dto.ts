import { ApiProperty } from '@nestjs/swagger';

export class AddRoleRequestDto {
  @ApiProperty()
  verticalId: string;

  @ApiProperty()
  roleName: string;
}
