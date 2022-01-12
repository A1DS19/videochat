import { Room } from 'src/rooms/rooms.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'room_chat' })
export class RoomChat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @Column()
  roomId: number;

  @ManyToOne(() => Room, (room) => room.messages)
  @JoinColumn({ name: 'roomId', referencedColumnName: 'id' })
  room: Room;

  @Column({ type: 'varchar' })
  message: string;
}
