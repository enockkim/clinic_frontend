export interface Bill {
  billNo?: number;
  appointmentId: number;
  status: number;
}

export interface BillDetail {
  entryNo?: number;
  billNo: number;
  cost: number;
  details: string;
  facility: number;
  status: number;
}

export interface CashType {
  cashTypeId: number; 
  cashType: string;
}

export interface PaymentDetails{
  amountPaid: number;
  cashType: number;
  billDetailEntryNo: number;
  reference: string;
}       

export interface AccountsReceivable{
  transactionId?: number;
  amountDue?: number;
  amountPaid: number;
  dateOfTransaction: Date;
  paymentMethod?: number;
  cashType: number;
  billDetailEntryNo: number;
  transactionRefrence: string; 
}

export interface BillData {
    billNo?: number;
    appointmentId: number;
    patientId: number;
    patientIdNumber: number;
    patientName: string;
    status: number;
}
