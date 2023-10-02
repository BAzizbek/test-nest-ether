import { Controller, Get } from '@nestjs/common';
import { BalanceService } from './balance.service';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get('top-change')
  async getTopBalanceChange(): Promise<any> {
    const addressWithTopChange =
      await this.balanceService.findAddressWithTopChange();
    return { addressWithTopChange };
  }
}
