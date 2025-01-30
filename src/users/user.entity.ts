import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  login: string;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 200 })
  email: string;

  @Column({ length: 200, select: false })
  password: string;

  @Column({ default: true })
  isActive: boolean;
}
