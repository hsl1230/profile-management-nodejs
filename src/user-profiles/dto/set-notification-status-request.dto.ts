import { ApiProperty } from '@nestjs/swagger';

export class SetNotificationStatusRequestDto {
  @ApiProperty({ enum: ['ON', 'OFF'] })
  status: 'ON' | 'OFF';
}
