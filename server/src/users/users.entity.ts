import { RoomChat } from 'src/room-chat/room-chat.entity';
import { Room } from 'src/rooms/rooms.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  @Column({ default: null })
  hashedRt: string;

  @OneToMany(() => Room, (room) => room.creator)
  rooms: Room[];

  @OneToMany(() => RoomChat, (roomChat) => roomChat.user)
  messages: RoomChat[];

  @CreateDateColumn()
  created_at: string;
}
