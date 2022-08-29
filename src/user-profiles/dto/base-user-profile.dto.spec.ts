import { BaseUserProfileDto } from './base-user-profile.dto';

describe('BaseUserProfileDto', () => {
  it('should be defined', () => {
    expect(new BaseUserProfileDto()).toBeDefined();
  });
});
