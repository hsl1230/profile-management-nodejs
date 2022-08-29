import { ApiProperty } from '@nestjs/swagger';

export class UpdateHomeAddressRequestDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty({ required: false })
  description?: string;
}
