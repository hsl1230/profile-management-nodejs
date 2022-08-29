import { ApiProperty } from '@nestjs/swagger';

export class PeriodOfTimeDto {
  @ApiProperty()
  fromTime: string;

  @ApiProperty()
  toTime: string;
}
