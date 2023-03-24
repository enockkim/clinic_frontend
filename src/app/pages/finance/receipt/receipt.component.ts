import { Component, OnInit, Inject } from '@angular/core';
import { FinanceService } from '../../../services/finance.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FinanceReportsService } from '../../../services/reports/finance-reports.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

    pdfSource: any;

    constructor(
        private financeReportsService: FinanceReportsService,
        @Inject(MAT_DIALOG_DATA) public data:
            {
                transactionRef: string
            },) { }

    ngOnInit(): void {

        console.log("here: ", this.data.transactionRef);
        this.financeReportsService.getReceipt(this.data.transactionRef)
            .subscribe(data => {
                this.pdfSource = data;
            });
    }

}
