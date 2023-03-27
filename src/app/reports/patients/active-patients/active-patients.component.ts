import { Component, OnInit } from '@angular/core';
import { PatientsReportsService } from '../../../services/reports/patients-reports.service';

@Component({
  selector: 'app-active-patients',
  templateUrl: './active-patients.component.html',
  styleUrls: ['./active-patients.component.scss']
})
export class ActivePatientsComponent implements OnInit {

    constructor(private patientsReportsService: PatientsReportsService) { }

    pdfSource: any;

    ngOnInit(): void {
        this.patientsReportsService.getActivePatients()
            .subscribe(data => {
                this.pdfSource = data;
            });
    }

}
