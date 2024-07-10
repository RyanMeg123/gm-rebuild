import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/booking/entities/booking.entity';
import { EntityManager, Like, Repository } from 'typeorm';
import { CreateMeetingRoomDto } from './dto/create-meeting-room.dto';
import { UpdateMeetingRoomDto } from './dto/update-meeting-room.dto';
import { MeetingRoom } from './entities/meeting-room.entity';

@Injectable()
export class MeetingRoomService {
  @InjectRepository(MeetingRoom)
  private repository: Repository<MeetingRoom>;

  @InjectEntityManager()
  entityManager: EntityManager;

  initData() {
    const room1 = new MeetingRoom();
    room1.name = '木星';
    room1.capacity = 10;
    room1.equipment = '白板';
    room1.location = '一层西';

    const room2 = new MeetingRoom();
    room2.name = '金星';
    room2.capacity = 5;
    room2.equipment = '';
    room2.location = '二层东';

    const room3 = new MeetingRoom();
    room3.name = '天王星';
    room3.capacity = 30;
    room3.equipment = '白板，电视';
    room3.location = '三层东';

    this.repository.save([room1, room2, room3]);
  }
  async create(createMeetingRoomDto: CreateMeetingRoomDto) {
    // room 唯一
    console.log(createMeetingRoomDto, '??????');
    const room = await this.repository.findOne({
      where: { name: createMeetingRoomDto.name },
    });
    console.log(room, 'room');
    if (room) {
      throw new BadRequestException('会议室已存在');
    }
    return await this.repository.save(createMeetingRoomDto);
  }

  async find(
    pageNumber: number,
    pageSize: number,
    name: string,
    capacity: number,
    equipment: string,
  ) {
    if (pageNumber < 1) {
      throw new BadRequestException('页码最小为1');
    }
    const skipCount = (pageNumber - 1) * pageSize;
    const condition: Record<string, any> = {};
    if (name) {
      condition.name = Like(`%${name}%`);
    }
    if (equipment) {
      condition.equipment = Like(`%${equipment}%`);
    }
    if (capacity) {
      condition.capacity = capacity;
    }
    const [meetingRooms, totalCount] = await this.repository.findAndCount({
      skip: skipCount,
      take: pageSize,
      where: condition,
    });
    return {
      meetingRooms,
      totalCount,
    };
  }
  findAll() {
    return `This action returns all meetingRoom`;
  }

  findOne(id: number) {
    return this.repository.findOneBy({
      id,
    });
  }

  async update(updateMeetingRoomDto: UpdateMeetingRoomDto) {
    const meetingRoom = await this.repository.findOneBy({
      id: updateMeetingRoomDto.id,
    });
    if (!meetingRoom) {
      throw new BadRequestException('会议室不存在');
    }
    meetingRoom.capacity = updateMeetingRoomDto.capacity;
    meetingRoom.location = updateMeetingRoomDto.location;
    meetingRoom.name = updateMeetingRoomDto.name;

    if (meetingRoom.description) {
      meetingRoom.description = updateMeetingRoomDto.description;
    }
    if (meetingRoom.equipment) {
      meetingRoom.equipment = updateMeetingRoomDto.equipment;
    }
    await this.repository.update(
      {
        id: meetingRoom.id,
      },
      meetingRoom,
    );
    return 'success';
  }

  async remove(id: number) {
    const bookings = await this.entityManager.findBy(Booking, {
      room: {
        id: id,
      },
    });

    for (let i = 0; i < bookings.length; i++) {
      this.entityManager.delete(Booking, bookings[i].id);
    }
    await this.repository.delete(id);
    return 'success';
  }
}
