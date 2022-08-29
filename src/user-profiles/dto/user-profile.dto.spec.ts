import { UserProfileDto } from './user-profile.dto';

describe('UserProfileDto', () => {
  it('should be defined', () => {
    expect(new UserProfileDto()).toBeDefined();
  });
});
