import { ApiProperty } from '@nestjs/swagger';

export class SetNotificationMethodsRequestDto {
  @ApiProperty()
  notificationMethods: string[];
}
