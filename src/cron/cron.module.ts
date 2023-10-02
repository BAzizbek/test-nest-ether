import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';
import { EtherscanModule } from 'src/etherscan/etherscan.module';
import { TransactionModule } from 'src/transactions/transactions.module';

@Module({
  imports: [ScheduleModule.forRoot(), EtherscanModule, TransactionModule],
  providers: [CronService],
})
export class CronModule {}
