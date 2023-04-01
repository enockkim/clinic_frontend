import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { environment } from '@angular/e ';


@Injectable({
    providedIn: 'root'
})
export class PatientsReportsService {


    reportServer: string = "https://localhost:44369/";
    srvURL: string = "";

    constructor(private httpClient: HttpClient) { }

    getActivePatients(): Observable<any> {
        this.srvURL = this.reportServer + 'api/Reports/Patient/GetPatientList';

        return this.httpClient.get(this.srvURL, { responseType: "blob" });
    }

}

