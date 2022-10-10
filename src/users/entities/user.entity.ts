import { Transaction } from '../../transactions/entities/transaction.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar', { length: 20 })
  public nickName: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column({
    type: 'varchar',
    length: 320,
    unique: true,
  })
  public email: string;

  @Column()
  public phone: string;

  @Column()
  public password: string;

  @Column({ default: false })
  public isValidEmail: boolean;

  @Column({ default: false })
  public isValidPhone: boolean;

  @Column({ default: true })
  public isActive: boolean;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}
