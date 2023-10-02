import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TransactionModule } from './transactions/transactions.module';
import { EtherscanModule } from './etherscan/etherscan.module';
import { CronModule } from './cron/cron.module';
import { dataSourceOptions } from 'db/data-source';
import { BalanceModule } from './balance/balance.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    TransactionModule,
    EtherscanModule,
    CronModule,
    BalanceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
