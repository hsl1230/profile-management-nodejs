import { ApiProperty } from '@nestjs/swagger';

export class EffectiveDateDto {
  @ApiProperty({ type: Date })
  startDate: Date;

  @ApiProperty({ type: Date, required: false })
  endDate?: Date;
}
