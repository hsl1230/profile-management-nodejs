import { ApiProperty } from '@nestjs/swagger';

export class CreatePrimaryUserProfileRequestDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  homeName: string;

  @ApiProperty()
  homeAddress: string;

  @ApiProperty({ required: false })
  homeDescription?: string;

  @ApiProperty()
  myTelusId: string;
}
