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
  Put,
} from '@nestjs/common';
import { MeetingRoomService } from './meeting-room.service';
import { CreateMeetingRoomDto } from './dto/create-meeting-room.dto';
import { UpdateMeetingRoomDto } from './dto/update-meeting-room.dto';
import { generateParseIntPipe } from 'src/utils/tool';

@Controller('meeting-room')
export class MeetingRoomController {
  constructor(private readonly meetingRoomService: MeetingRoomService) {}

  @Get('list')
  async list(
    @Query(
      'pageNumber',
      new DefaultValuePipe(1),
      generateParseIntPipe('pageNumber'),
    )
    pageNumber: number,

    @Query(
      'pageSize',
      new DefaultValuePipe(2),
      generateParseIntPipe('pageSize'),
    )
    pageSize: number,
    @Query('name') name: string,
    @Query('capacity') capacity: number,
    @Query('equipment') equipment: string,
  ) {
    return await this.meetingRoomService.find(
      pageNumber,
      pageSize,
      name,
      capacity,
      equipment,
    );
  }

  @Post('create')
  async create(@Body() createMeetingRoomDto: CreateMeetingRoomDto) {
    console.log('????????!!!');
    return await this.meetingRoomService.create(createMeetingRoomDto);
  }

  @Put('update')
  async update(@Body() meetingRoomDto: UpdateMeetingRoomDto) {
    return await this.meetingRoomService.update(meetingRoomDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.meetingRoomService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meetingRoomService.remove(+id);
  }
}
