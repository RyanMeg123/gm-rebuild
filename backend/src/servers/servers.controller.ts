import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { ServersService } from './servers.service';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { generateParseIntPipe } from 'src/utils/tool';

@Controller('servers')
export class ServersController {
  constructor(private readonly serversService: ServersService) {}

  // search接口 list

  // add server接口

  // get server all list接口

  // 批量维护服务器接口

  // 批量开服接口

  // 批量推荐接口

  @Get('init-data')
  async initData() {
    await this.serversService.initData();
    return 'done';
  }

  @Get('list')
  async getList(
    @Query(
      'pageNumber',
      new DefaultValuePipe(1),
      generateParseIntPipe('pageNumber'),
    )
    pageNumber: number,
    @Query(
      'pageSize',
      new DefaultValuePipe(10),
      generateParseIntPipe('pageSize'),
    )
    pageSize: number,
    @Query('serverName') serverName: string,
    @Query('serverStatus') serverStatus: number,
    @Query('serverType') serverType: number,
    @Query('serverZoneId') serverZoneId: string,
    @Query('serverId') serverId: number,
  ) {
    return await this.serversService.getList(
      pageNumber,
      pageSize,
      serverName,
      serverStatus,
      serverType,
      serverZoneId,
      serverId,
    );
  }
  @Post()
  create(@Body() createServerDto: CreateServerDto) {
    return this.serversService.create(createServerDto);
  }

  @Get()
  findAll() {
    return this.serversService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serversService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServerDto: UpdateServerDto) {
    return this.serversService.update(+id, updateServerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serversService.remove(+id);
  }
}
