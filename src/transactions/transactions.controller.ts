import { Controller, Get } from '@nestjs/common';
import { TransactionService } from './transactions.service';
import { Transaction } from './transactions.entity';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async findAll(): Promise<Transaction[]> {
    return this.transactionService.findAll();
  }
}
