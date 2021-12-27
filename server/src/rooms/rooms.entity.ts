import { User } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'room' })
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50, unique: true })
  name: string;

  @Column()
  creatorId: number;

  @ManyToOne(() => User, (user) => user.rooms)
  @JoinColumn({ name: 'creatorId', referencedColumnName: 'id' })
  creator: User;

  @CreateDateColumn()
  created_at: string;
}
