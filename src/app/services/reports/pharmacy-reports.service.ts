import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PharmacyReportsService {

    constructor(private httpClient: HttpClient) { }

    reportServer: string = "https://localhost:44369/";
    srvURL: string = "";

    getPrescription(appointmentId: number): Observable<any> {
        this.srvURL = this.reportServer + 'api/Reports/Pharmacy/GetPrescription?appointmentId=' + appointmentId;
        return this.httpClient.get(this.srvURL, { responseType: "blob" });
    }
}


