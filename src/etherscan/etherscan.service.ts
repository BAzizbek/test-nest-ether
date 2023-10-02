import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class EtherscanService {
  constructor(private readonly httpService: HttpService) {}

  async getLatestBlockNumber(): Promise<number> {
    try {
      const responseObservable: Observable<AxiosResponse> =
        this.httpService.get(`https://api.etherscan.io/api`, {
          params: {
            module: 'proxy',
            action: 'eth_blockNumber',
          },
        });

      const response = await firstValueFrom(responseObservable);

      const hexBlockNumber = response.data.result;

      return parseInt(hexBlockNumber, 16);
    } catch (error) {
      throw new Error(`Failed to fetch block transactions: ${error.message}`);
    }
  }

  async getBlockTransactions(blockNumber: number): Promise<any> {
    try {
      const responseObservable: Observable<AxiosResponse> =
        this.httpService.get(`https://api.etherscan.io/api`, {
          params: {
            module: 'proxy',
            action: 'eth_getBlockByNumber',
            tag: blockNumber.toString(16),
            boolean: true,
          },
        });

      const response = await firstValueFrom(responseObservable);

      console.log(response.data.result);

      return response.data.result.transactions;
    } catch (error) {
      throw new Error(`Failed to fetch block transactions: ${error.message}`);
    }
  }
}
