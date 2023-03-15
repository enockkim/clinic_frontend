export interface Transaction {
    transactionId: number;
    transactionType: number;    //contribution, expense payments
    transactionMode: number;    //mpesa paybill, bank paybill
    amount: number;
    refrence: string;
    memberId: number;
    dateTimeOfTransaction: Date;
    status: number;             //approved, pending,
    approvedBy: number;
  }

export interface TransactionResult {
  transactionId: number;
  transactionType: string;    //contribution, expense payments
  transactionMode: string;    //mpesa paybill, bank paybill
  amount: number;
  refrence: string;
  memberId: number;
  memberName: string;
  dateTimeOfTransaction: Date;
  status: string;             //approved, pending,
  approvedBy: number;
}