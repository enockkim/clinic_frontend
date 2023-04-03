import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef  } from '@angular/material/dialog';
import { Appointment, AppointmentData } from 'app/models/Appointment';
import { CashType, PaymentDetails, AccountsReceivable } from 'app/models/finance';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinanceService } from '../../../services/finance.service';
import { ReceiptComponent } from '../../../pages/finance/receipt/receipt.component'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pay-bill',
  templateUrl: './pay-bill.component.html',
  styleUrls: ['./pay-bill.component.scss'],
  template: 'passed in {{ data.billTotal, data.billNo }}',
})
export class PayBillComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      billTotal: number, 
      billNo: number,
    }, 
    private fb: FormBuilder, 
    private FinanceService: FinanceService, 
    private dialog: MatDialog,
      public dialogRef: MatDialogRef<PayBillComponent>,
        private _snackBar: MatSnackBar,
    ) { }

  form: FormGroup;
  title: string = "Pay Bill";
  description: string = "Complete the form to pay pending bill.";
  button: string = "Pay";
  response: Boolean;
    transactionRef: string;

  cashType: CashType[];
  //paymentDetails: AccountsReceivable = null;

  async ngOnInit() {

    this.form = this.fb.group({
      cashType: ['', Validators.required],
      reference: ['', Validators.required]
    });

    
    this.cashType = await this.FinanceService.getCashTypes();
  }
    
  async onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      let paymentDetails: AccountsReceivable = {
        transactionRefrence: formData.reference,
        cashType: Number(formData.cashType),
        billDetailEntryNo: this.data.billNo,
        amountPaid: this.data.billTotal,
        transactionId: 0,
        amountDue: 0,
        dateOfTransaction: new Date(),
        paymentMethod: null
      }
        console.log("here: ", formData.reference);
        this.transactionRef = formData.reference;
        console.log("here: ", this.transactionRef);

      const res = await this.FinanceService.payBill(paymentDetails);
   
        if (res) {

            console.log("here: ", this.transactionRef);
            this._snackBar.open('Payment completed successfully. Generating reciept...', 'Ok', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 5 * 1000,
            });

            const dial = this.dialog.open(ReceiptComponent, {
                data: { transactionRef: this.transactionRef },
                width: "50%",
                height: "",
            });

            console.log("here: ", this.transactionRef);
            dial.afterClosed()
                .subscribe(res => {
                    this.dialogRef.close(this.data.billNo);
                })
        }else{  
            this._snackBar.open('Error completing payment. Pleas try again or contact a system administrator.', 'Ok', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 5 * 1000,
            });
      }
      
    }
  }

}
