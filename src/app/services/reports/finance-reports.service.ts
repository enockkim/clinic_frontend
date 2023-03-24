import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FinanceReportsService {

    reportServer: string = "https://localhost:44369/";
    srvURL: string = "";

    constructor(private httpClient: HttpClient) { }

    getReceipt(transactionRef: string): Observable<any> {
        this.srvURL = this.reportServer + 'api/Reports/Finance/GetReciept?transactionRef=' + transactionRef;
        return this.httpClient.get(this.srvURL, { responseType: "blob" });
    }
}
