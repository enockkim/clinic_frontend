import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Bill, BillDetail, CashType, PaymentDetails, AccountsReceivable, BillData } from '../models/Finance';


const httpOptions1 = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    })
}

@Injectable({
  providedIn: 'root'
})

export class FinanceService {

  private apiUrl = 'https://localhost:44320/Finance';

  constructor(private http: HttpClient) { }

  async getBills(): Promise<Bill[]>{
    const url = `${this.apiUrl}/GetBills`;
    return await this.http.get<Bill[]>(url).toPromise();
  }

    async getBillData(): Promise<BillData[]> {
        const url = `${this.apiUrl}/GetBillData`;
        return await this.http.get<BillData[]>(url).toPromise();
    }

  async getBillDetails(billNo: number): Promise<BillDetail[]>{
    const url = `${this.apiUrl}/GetBillDetailsByBillNo?billNo=${billNo}`;
    return await this.http.get<BillDetail[]>(url).toPromise();
  }

  async getCashTypes(): Promise<CashType[]>{
    const url = `${this.apiUrl}/GetCashTypes`;
    return await this.http.get<CashType[]>(url).toPromise();
  }

  async payBill(paymentDetials: AccountsReceivable): Promise<boolean>{
    const url = `${this.apiUrl}/PayBill`;
      const res = await this.http.post<boolean>(url, paymentDetials).toPromise();
    return res;
  }
}
