import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PharmacyReportsService } from '../../../services/reports/pharmacy-reports.service';

@Component({
  selector: 'app-view-prescription-report',
  templateUrl: './view-prescription-report.component.html',
  styleUrls: ['./view-prescription-report.component.scss']
})
export class ViewPrescriptionReportComponent implements OnInit {
    constructor(
        private pharmacyReportsService: PharmacyReportsService,
        @Inject(MAT_DIALOG_DATA) public data:
            {
                appointmentId: number
            }
    ) { }

    pdfSource: any;

    ngOnInit(): void {
        this.pharmacyReportsService.getPrescription(this.data.appointmentId)
            .subscribe(data => {
                this.pdfSource = data;
            });
    }

}
