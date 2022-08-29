import { ApiProperty } from '@nestjs/swagger';

export class BaseUserProfileDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: ['ACTIVE', 'DELETED'] })
  status: 'ACTIVE' | 'DELETED';

  @ApiProperty({
    description: 'set when accept an invitation',
    required: false,
  })
  myTelusId?: string;
}
