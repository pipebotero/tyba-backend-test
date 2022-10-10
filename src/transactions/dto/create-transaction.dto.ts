import { User } from 'src/users/entities/user.entity';

export class CreateTransactionDto {
  type: string;
  origin: string;
  destination: string;
  amount: string;
  date: string;
  user: User;
}
