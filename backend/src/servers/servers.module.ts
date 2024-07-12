import { Module } from '@nestjs/common';
import { ServersService } from './servers.service';
import { ServersController } from './servers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerList } from './entities/serverList.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServerList])],
  controllers: [ServersController],
  providers: [ServersService],
})
export class ServersModule {}
