import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  todo_id: number;

  @Column({ nullable: false })
  text: string;

  @Column({ default: false })
  completed: boolean;

  @Column()
  user_id: number;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  user: User;
}
