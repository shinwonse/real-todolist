import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Todo } from './todo.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ nullable: false })
  nickname: string;

  @Column({ default: false })
  is_kakao: boolean;

  @Column({ type: 'bigint', unique: true })
  kakao_id: number;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
