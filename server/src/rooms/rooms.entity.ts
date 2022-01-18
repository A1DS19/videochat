import { RoomChat } from 'src/room-chat/room-chat.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'room' })
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  name: string;

  @Column()
  creatorId: number;

  @Column('varchar')
  url_name: string;

  @ManyToOne(() => User, (user) => user.rooms)
  @JoinColumn({ name: 'creatorId', referencedColumnName: 'id' })
  creator: User;

  @OneToMany(() => RoomChat, (roomChat) => roomChat.room)
  messages: RoomChat[];

  @CreateDateColumn()
  created_at: string;
}
