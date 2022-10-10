import { User } from '../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

export enum TransactionType {
  INVESTMENT = 'investment',
  EXTRACTION = 'extraction',
  MOVEMENT = 'movement',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.INVESTMENT,
  })
  type: string;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column()
  amount: string;

  @Column({ type: 'timestamp' })
  date: string;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;
}
