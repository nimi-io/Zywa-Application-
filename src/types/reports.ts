export interface Ireport {
  email: string;
  startDate: Date;
  endDate: Date;
}

export interface IgroupedTransactions {
  [key: string]: {
    date_of_transaction: Date;
    amount: number;
  }[];
}
export interface Itransaction {
  email: string;
  date_of_transaction: Date;
  amount: number;
}
export interface ItransactionParse{
  date_of_transaction: Date;
  amount: number;
}