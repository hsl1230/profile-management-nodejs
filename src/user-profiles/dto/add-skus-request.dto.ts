import { ApiProperty } from '@nestjs/swagger';
import { SkuDto } from './sku.dto';

export class AddSkusRequestDto {
  @ApiProperty({
    deprecated: true,
    required: false,
    description: 'profile management should not worry about how to bill',
  })
  billingAccountNumber: string;

  @ApiProperty({ type: SkuDto, isArray: true })
  skus: SkuDto[];
}
