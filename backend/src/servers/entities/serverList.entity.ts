import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'server_list',
})
export class ServerList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  server_id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column({
    length: 100,
    default: '',
  })
  short_name: string;

  @Column({
    default: 0, //服务器状态（0维护，1开启）
  })
  status: number;

  @Column({
    comment: '创建时间',
    type: 'int',
  })
  create_time: number;

  @BeforeInsert()
  createTimeStamp() {
    this.create_time = Math.floor(Date.now() / 1000); //ms
  }

  @Column({
    comment: '更新时间',
    type: 'int',
  })
  update_time: number;

  @BeforeInsert()
  updateTimeStamp() {
    this.update_time = Math.floor(Date.now() / 1000); //ms
  }

  @Column({
    comment: '开发时间',
    type: 'int',
  })
  open_time: number;

  @BeforeInsert()
  openTimeStamp() {
    this.open_time = Math.floor(Date.now() / 1000); //ms
  }
  @Column({
    length: 200,
  })
  host: string;

  @Column({
    length: 200,
  })
  port: string;

  @Column({
    default: 0, //服务器状态（0维护，1开启）
  })
  server_type: number;

  @Column({
    comment: '维护开始时间',
    type: 'int',
  })
  maintain_start_time: number;

  @BeforeInsert()
  maintainStartTimeStamp() {
    this.maintain_start_time = Math.floor(Date.now() / 1000); //ms
  }

  @Column({
    comment: '维护结束时间',
    type: 'int',
  })
  maintain_end_time: number;

  @BeforeInsert()
  maintainEndTimeStamp() {
    this.maintain_end_time = Math.floor(Date.now() / 1000); //ms
  }

  @Column({
    length: 200,
    default: '',
  })
  spec_version_hash: string;

  @Column({
    comment: 'spec更新时间',
    type: 'int',
  })
  spec_update_time: number;

  @BeforeInsert()
  spec_updateTimeStamp() {
    this.spec_update_time = Math.floor(Date.now() / 1000); //ms
  }

  @Column({
    length: 200,
    default: '',
  })
  language_versions: string;

  @Column({
    default: 0, //推荐权重
  })
  weight: number;

  @Column({
    length: 200,
    default: '10',
  })
  zoneId: string;

  @Column({
    length: 200,
    default: '10',
  })
  specVersion: string;

  @Column({
    length: 200,
    default: '10',
  })
  lang_version_tag: string;

  @Column({
    length: 200,
    default: '10',
  })
  server_version_tag: string;

  @Column({
    length: 200,
    default: '10',
  })
  try_pub_spec_version_tag: string;

  @Column({
    length: 200,
    default: '10',
  })
  spec_publish_note: string;

  @Column({
    length: 200,
    default: '10',
  })
  pipeline_server_type: string;

  @Column({
    length: 200,
    default: '10',
  })
  pipeline_serverHash_index: string;
}
