import { Component, OnInit } from '@angular/core';
import { PatientsReportsService } from '../../../services/reports/patients-reports.service';

@Component({
  selector: 'app-active-patients',
  templateUrl: './active-patients.component.html',
  styleUrls: ['./active-patients.component.scss']
})
export class ActivePatientsComponent implements OnInit {

    pdfSource: any;

    constructor(private patientsReportsService: PatientsReportsService) { }

    ngOnInit(): void {
        this.patientsReportsService.getActivePatients()
            .subscribe(data => {
                this.pdfSource = data;
            });
    }

}
