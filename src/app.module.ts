import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserProfilesModule } from './user-profiles/user-profiles.module';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
  imports: [UserProfilesModule, PermissionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
