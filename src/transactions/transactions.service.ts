import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}
  async create(createTransactionDto: CreateTransactionDto) {
    const newTransaction = await this.transactionRepository.create(
      createTransactionDto,
    );
    await this.transactionRepository.save(newTransaction);
    return newTransaction;
  }

  async findAll(userId: string) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
    if (transactions) {
      return transactions;
    }
    throw new HttpException(
      'Transactions with this user does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
