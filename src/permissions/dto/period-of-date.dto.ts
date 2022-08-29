import { ApiProperty } from '@nestjs/swagger';

export class PeriodOfDateDto {
  @ApiProperty({ type: Number, required: false, isArray: true })
  daysInMonth: number[];

  @ApiProperty({ type: Number, required: false, isArray: true })
  daysInWeek: number[];
}
