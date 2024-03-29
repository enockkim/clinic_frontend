import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FinanceReportsService {

    constructor(private httpClient: HttpClient) { }

    reportServer: string = "https://localhost:44369/";
    srvURL: string = "";

    getReceipt(transactionRef: string): Observable<any> {
        this.srvURL = this.reportServer + 'api/Reports/Finance/GetReciept?transactionRef=' + transactionRef;
        return this.httpClient.get(this.srvURL, { responseType: "blob" });
    }
}
