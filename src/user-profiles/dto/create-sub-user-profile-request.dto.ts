import { ApiProperty } from '@nestjs/swagger';

export class CreateSubUserProfileRequestDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  email: string;
}
