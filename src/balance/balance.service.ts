import { Injectable } from '@nestjs/common';
import { TransactionService } from '../transactions/transactions.service';

@Injectable()
export class BalanceService {
  constructor(private readonly transactionService: TransactionService) {}

  async findAddressWithTopChange(): Promise<string> {
    const last100BlocksTransactions =
      await this.transactionService.fetchTransactionsForLast100Blocks();

    // Calculate balance changes for each address
    const balanceChangesMap = new Map<string, number>();

    for (const transaction of last100BlocksTransactions) {
      if (transaction.from) {
        balanceChangesMap.set(
          transaction.from,
          (balanceChangesMap.get(transaction.from) || 0) -
            parseFloat(transaction.value),
        );
      }

      if (transaction.to) {
        balanceChangesMap.set(
          transaction.to,
          (balanceChangesMap.get(transaction.to) || 0) +
            parseFloat(transaction.value),
        );
      }
    }

    let topAddress = '';
    let topChange = 0;

    for (const [address, change] of balanceChangesMap.entries()) {
      if (Math.abs(change) > Math.abs(topChange)) {
        topAddress = address;
        topChange = change;
      }
    }

    return topAddress;
  }
}
