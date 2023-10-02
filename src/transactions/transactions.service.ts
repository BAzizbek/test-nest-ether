import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transactions.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async saveTransactions(transactionData: any): Promise<Transaction[]> {
    const transaction = this.transactionRepository.create(transactionData);

    return await this.transactionRepository.save(transaction);
  }

  async fetchTransactionsForLast100Blocks(): Promise<Transaction[]> {
    const last100Blocks = await this.transactionRepository
      .createQueryBuilder()
      .orderBy('blocknumber', 'DESC')
      .limit(100)
      .getMany();

    return last100Blocks;
  }

  async findAll(): Promise<Transaction[]> {
    return await this.transactionRepository.find();
  }
}
