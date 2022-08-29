import { ApiProperty } from '@nestjs/swagger';

export class BindMyTelusIdRequestDto {
  @ApiProperty({ required: false })
  myTelusId: string;
}
