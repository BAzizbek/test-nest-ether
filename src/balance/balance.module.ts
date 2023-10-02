import { Module } from '@nestjs/common';
import { TransactionModule } from '../transactions/transactions.module';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';

@Module({
  imports: [TransactionModule],
  controllers: [BalanceController],
  providers: [BalanceService],
})
export class BalanceModule {}
