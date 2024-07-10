import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MeetingRoom {
  @PrimaryGeneratedColumn({
    comment: '会议室ID',
  })
  id: number;

  @Column({
    length: 50,
    comment: '会议室名称',
  })
  name: string;

  @Column({
    comment: '会议室容量',
  })
  capacity: number;

  @Column({
    comment: '会议室位置',
    length: 50,
  })
  location: string;

  @Column({
    comment: '会议室设备',
    length: 50,
  })
  equipment: string;

  @Column({
    comment: '描述',
    length: 100,
    default: '',
  })
  description: string;

  @Column({
    comment: '是否被预定',
    default: false,
  })
  isBooked: boolean;

  @Column({
    comment: '创建时间',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    comment: '更新时间',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;
}
