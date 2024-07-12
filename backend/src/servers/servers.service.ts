import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { ServerList } from './entities/serverList.entity';

@Injectable()
export class ServersService {
  @InjectRepository(ServerList)
  private repository: Repository<ServerList>;
  async initData() {
    const server2 = new ServerList();

    server2.name = 'test2';
    server2.status = 0;
    server2.port = '8080';
    server2.server_id = 2;
    server2.host = '127.0.0.1';
    server2.server_type = 1;
    server2.language_versions = '1.0.0';
    server2.weight = 1;
    server2.zoneId = '1';
    server2.specVersion = '1.0.0';
    server2.lang_version_tag = '1.0.0';

    const server3 = new ServerList();

    server3.name = 'test3';
    server3.status = 0;
    server3.port = '8080';
    server3.server_id = 3;
    server3.host = '127.0.0.1';
    server3.server_type = 1;
    server3.language_versions = '1.0.0';
    server3.weight = 1;
    server3.zoneId = '1';
    server3.specVersion = '1.0.0';
    server3.lang_version_tag = '1.0.0';
    await this.repository.save([server2, server3]);
  }

  async getList(
    pageNumber: number,
    pageSize: number,
    serverName: string,
    serverStatus: number,
    serverType: number,
    serverZoneId: string,
    serverId: number,
  ) {
    const skipCount = (pageNumber - 1) * pageSize;
    const condition: Record<string, any> = {};
    console.log(serverStatus, 'serverStatus');
    if (serverName) {
      condition.name = serverName;
    }
    if (serverStatus) {
      condition.status = serverStatus;
    }
    if (serverType) {
      condition.server_type = serverType;
    }
    if (serverZoneId) {
      condition.zoneId = serverZoneId;
    }
    if (serverId) {
      condition.server_id = serverId;
    }

    const [servers, total] = await this.repository.findAndCount({
      skip: skipCount,
      take: pageSize,
      where: condition,
    });
    return {
      servers,
      total,
    };
  }
  create(createServerDto: CreateServerDto) {
    return 'This action adds a new server';
  }

  findAll() {
    return `This action returns all servers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} server`;
  }

  update(id: number, updateServerDto: UpdateServerDto) {
    return `This action updates a #${id} server`;
  }

  remove(id: number) {
    return `This action removes a #${id} server`;
  }
}
