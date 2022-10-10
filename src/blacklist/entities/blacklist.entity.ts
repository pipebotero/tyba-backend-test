import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Blacklist {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public token: string;
}
