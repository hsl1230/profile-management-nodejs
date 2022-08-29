import { ApiProperty } from '@nestjs/swagger';

export class HomeAddressDto {
  @ApiProperty()
  primaryUserProfileId: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty({ required: false })
  description?: string;
}
