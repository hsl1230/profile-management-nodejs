import { PeriodOfTimeDto } from './period-of-time.dto';
import { PeriodOfDateDto } from './period-of-date.dto';
import { EffectiveDateDto } from './effective-date.dto';
import { ApiProperty } from '@nestjs/swagger';
/**
  Declare <Who>
    Sub user profile id 
    Role?
  is allowed to use <a feature/action> 
    Any feature
    Watch live stream
    Zoom in/out 
    Unlock the door
    Adjust the temperature
  of <a resource> 
    Any device
    Device group / Device class?
    The lock
    The camera
    The light
    The System
  in which <period of time> 
    Any time
    From 9am to 5pm
  in which <period of date> 
    Any Date
    Every Monday, Wednesday, Friday
    Every 1, 2, 21
  effective from <start date> to <end date>
 */
export class PermissionDto {
  @ApiProperty()
  verticalId: string;

  @ApiProperty({ enum: ['device', 'device group', 'device class', 'system'] })
  resourceType: 'device' | 'device group' | 'device class' | 'system';

  @ApiProperty({
    description: 'feature id of the resource',
    required: true,
  })
  resourceActionId: string;

  @ApiProperty({
    description: 'can be a device id, device group id, or device class id',
    required: true,
  })
  resourceId: string;

  @ApiProperty({ required: false })
  periodOfTime?: PeriodOfTimeDto;

  @ApiProperty({ required: false })
  periodOfDate?: PeriodOfDateDto;

  @ApiProperty({ required: false })
  effectiveDate?: EffectiveDateDto;
}
