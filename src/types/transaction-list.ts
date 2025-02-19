import { Bank } from './bank';
import { Store } from './store';

export interface TransactionList {
  id: string;
  name: string;
  type: string;
  amount: number;
  status: string;
  orderId?: string;
  bankId?: string;
  bank: Bank;
  storeId: string;
  store: Store;
}
