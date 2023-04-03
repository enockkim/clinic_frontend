import { Component, ViewChild, ViewChildren, QueryList, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import { FinanceService } from '../../../services/finance.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { Bill, BillDetail } from '../../../models/Finance';
import { PayBillComponent } from '../../../pages/finance/pay-bill/pay-bill.component'

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BillingComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private FinanceService: FinanceService
  ) { }

  billData: Bill[];
  billDataSource: MatTableDataSource<Bill>;
  billDetailData: BillDetail[];
  billDetailDataSource: MatTableDataSource<BillDetail>;

  billDataColumnsToDisplay: string[] = ['billNo', 'appointmentId'];
  billDetailsColumnsToDisplay: string[] = ['entryNo', 'facility', 'details', 'cost'];  
  columnsToDisplayWithExpand = [...this.billDataColumnsToDisplay, 'expand'];

  expandedElement: Bill | null;
  billNo: number;
  // billTotal: number = 0;

  async ngOnInit() {
      this.billData = await this.FinanceService.getBills()  
      this.billData.sort((a, b) => (a.billNo > b.billNo ? -1 : 1));
    this.billDataSource = new MatTableDataSource(this.billData.filter(bill => bill.status == 0));
    // this.billDataSource.sort = this.sort;
  }

  async toggleRow(element: Bill) {
    this.billDetailDataSource = null;
    this.billDetailData = await this.FinanceService.getBillDetails(Number(element.billNo)); 
    this.billDetailDataSource = new MatTableDataSource(this.billDetailData.filter(billDetail => billDetail.status == 0));
    this.billNo = element.billNo;
    this.expandedElement = element;
    console.log(this.billDetailData[0]);
    // element.addresses && (element.addresses as MatTableDataSource<Address>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    // this.cd.detectChanges();
    // this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Address>).sort = this.innerSort.toArray()[index]);
  }

  // applyFilter(filterValue: string) {
  //   this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Address>).filter = filterValue.trim().toLowerCase());
  // }

  
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    var billTotal = 0;
    this.billDetailData.forEach(function (billEntry){
      if(billEntry.status == 0){
        billTotal += billEntry.cost;
      }
    });
    const dial = this.dialog.open(PayBillComponent, {
      data: { billTotal: billTotal, billNo: this.billDetailData[0].billNo },
      width: "50%",
      height: "",
    });

    dial.afterClosed()
    .subscribe(res => {
      console.log("pay bill result: "+res);
      if(res){
        //find the index of the updated elementc
        const index = this.billData.findIndex(bill => bill.billNo === this.billDetailData[0].billNo);
        // replace the element at that index with the updated appointment data
        if (index !== -1) {
          this.billData[index] = res;
          this.billDataSource = new MatTableDataSource(this.billData.filter(bill => bill.status == 0));
        }
      }
    })
  }

}
