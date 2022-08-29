import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserProfileRequestDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  phoneNumber?: string;

  @ApiProperty({ required: false })
  email?: string;
}
