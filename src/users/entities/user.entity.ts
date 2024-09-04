import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  loin: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  fone: string;

  @Column({ default: true })
  isActive: boolean;
}
