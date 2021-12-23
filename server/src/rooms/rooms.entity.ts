import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rooms' })
export class Rooms {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  name: string;

  @Column()
  creator_id: number;

  @Column()
  participant_id: number;

  @Column({ default: +new Date() })
  created_at: string;
}
