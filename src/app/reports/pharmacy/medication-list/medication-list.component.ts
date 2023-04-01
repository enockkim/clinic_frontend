import { Component, OnInit } from '@angular/core';
import { PharmacyReportsService } from '../../../services/reports/pharmacy-reports.service';

@Component({
  selector: 'app-medication-list',
  templateUrl: './medication-list.component.html',
  styleUrls: ['./medication-list.component.scss']
})
export class MedicationListComponent implements OnInit {

    constructor(private pharmacyReportsService: PharmacyReportsService) { }

    pdfSource: any;

    ngOnInit(): void {
        this.pharmacyReportsService.getMedicationList()
            .subscribe(data => {
                this.pdfSource = data;
            });
    }

}
