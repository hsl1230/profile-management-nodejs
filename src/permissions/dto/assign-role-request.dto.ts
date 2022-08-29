import { ApiProperty } from '@nestjs/swagger';

export class AssignRoleRequestDto {
  @ApiProperty()
  verticalId: string;

  @ApiProperty()
  roleName: string;
}
