import { PrimaryUserProfileDto } from './primary-user-profile.dto';
import { SubUserProfileDto } from './sub-user-profile.dto';

export type UserProfileDto = PrimaryUserProfileDto | SubUserProfileDto;
