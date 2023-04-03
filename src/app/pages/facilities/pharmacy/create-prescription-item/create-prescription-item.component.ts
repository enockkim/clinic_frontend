import { Component, OnInit, Inject } from '@angular/core';
import { Prescription, Inventory, InvetoryCategory} from 'app/models/Pharmacy';
import { PharmacyService } from 'app/services/facilities/pharmacy.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef  } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-prescription-item',
  templateUrl: './create-prescription-item.component.html',
  styleUrls: ['./create-prescription-item.component.scss']
})
export class CreatePrescriptionItemComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: 
    {
      appointmentId: number
    }, 
    private fb: FormBuilder,
    public pharmacyService: PharmacyService,
    dialog: MatDialog,
      public dialogRef: MatDialogRef<CreatePrescriptionItemComponent>,
      private _snackBar: MatSnackBar,
  ) { }

  invetoryCategory: InvetoryCategory[] = [];
  inventory: Map<number, Inventory[]> = new Map<number, Inventory[]>(); 
  //operationSubTypesList: OperationSubtype[];
  typeIndex: number;
  form: FormGroup;
 
  async ngOnInit() {
    this.form = this.fb.group({
      category: ['', Validators.required],
      doctorRemarks: ['', Validators.required],
      inventory: ['', Validators.required],
      dosageNumber: ['', Validators.required]
    });

  this.invetoryCategory = await this.pharmacyService.getInventoryCategory(); 
  const inventoryListRes = await this.pharmacyService.getInventory();  
  console.log(this.invetoryCategory);
  console.log(inventoryListRes);
  let inventoryDict = new Map<number, Inventory[]>();
  // const operationTypesTemp: OperationType[] = [];
  this.invetoryCategory.forEach(function (inventoryCategory){
    let inventoryList: Inventory[] = [];
      inventoryListRes.forEach(function (invetoryItem){
        if(invetoryItem.category == inventoryCategory.categoryId){
          inventoryList.push(invetoryItem);
          console.log(invetoryItem);
        }
      });

      inventoryDict[inventoryCategory.categoryId] = inventoryList;
    });
    
    this.inventory = inventoryDict;
    // console.log(this.operationTypes);
    console.log(this.inventory);
  }
  
  async onSubmit(){
    const formData = this.form.value;
    console.log("itemId: ",formData.inventory);  
    console.log("disageNumber",formData.dosageNumber); 
    console.log("remarks", formData.doctorRemarks);

    if (this.form.valid) {
      const formData = this.form.value;
      let presciptionItem: Prescription = {
        appointmentId: this.data.appointmentId,
        itemId: formData.inventory,
        dosageNumber: Number(formData.dosageNumber),
        remarks: formData.doctorRemarks,
        status: 1,
        availability: null
      }
      console.log("appointmentId",this.data.appointmentId);
      const res = await this.pharmacyService.addToPrescription(presciptionItem);
        if (res) {
            //laboratoryRequestData.labId = Number(res);
            console.log("pharmacy: " + res);
            this._snackBar.open('Item added to presctiption successfully.', 'Ok', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 5 * 1000,
            });
            this.dialogRef.close(res);
        } else {
            this._snackBar.open('Error creating request. Please try again or contact a system administrator.', 'Ok', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 5 * 1000,
            });
        }       
    }
  }
}

