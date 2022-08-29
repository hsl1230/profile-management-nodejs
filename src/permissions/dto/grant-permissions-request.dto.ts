import { ApiProperty } from '@nestjs/swagger';
import { PermissionDto } from './permission.dto';
export class GrantPermissionsRequestDto {
  @ApiProperty({ type: PermissionDto, isArray: true })
  permissions: PermissionDto[];
}
