import { Module } from '@nestjs/common';
import { SecretsController } from './secrets.controller';
import { SecretsService } from './secrets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import TaskEntity from './entity/task.entity';
import ProfileEntity from './entity/profile.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([TaskEntity, ProfileEntity])],
  controllers: [SecretsController],
  providers: [SecretsService],
})
export class SecretsModule {}
