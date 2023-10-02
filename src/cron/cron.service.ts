import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EtherscanService } from '../etherscan/etherscan.service';
import { TransactionService } from '../transactions/transactions.service';

@Injectable()
export class CronService {
  constructor(
    private readonly etherscanService: EtherscanService,
    private readonly transactionService: TransactionService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async fetchAndSaveTransactions() {
    try {
      const startBlockNumber = 17583000;

      const latestBlockHexNumber =
        await this.etherscanService.getLatestBlockNumber();

      for (
        let blockNumber = startBlockNumber;
        blockNumber <= latestBlockHexNumber;
        blockNumber++
      ) {
        const transactions =
          await this.etherscanService.getBlockTransactions(blockNumber);

        await this.transactionService.saveTransactions(transactions);
      }

      console.log(
        `Fetched and saved transactions for block ${latestBlockHexNumber}`,
      );
    } catch (error) {
      console.error(`Error fetching and saving transactions: ${error.message}`);
    }
  }
}
