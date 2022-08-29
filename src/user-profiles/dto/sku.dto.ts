import { ApiProperty } from '@nestjs/swagger';

export class SkuDto {
  @ApiProperty()
  skuId: string;

  @ApiProperty()
  verticalId: string;
}
