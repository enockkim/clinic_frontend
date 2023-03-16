
import { Component, OnInit, Inject } from '@angular/core';
import { OperationRequest, OperationSubtype, OperationType } from 'app/models/Operation';
import { OperationService } from 'app/services/facilities/operation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef  } from '@angular/material/dialog';

@Component({
  selector: 'app-create-operation-request',
  templateUrl: './create-operation-request.component.html',
  styleUrls: ['./create-operation-request.component.scss']
})
export class CreateOperationRequestComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: 
    {
      appointmentId: number
    }, 
    private fb: FormBuilder,
    public operationService: OperationService,
    dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateOperationRequestComponent>
  ) { }

  operationTypes: OperationType[] = [];
  operationSubTypes: Map<number, OperationSubtype[]>; 
  //operationSubTypesList: OperationSubtype[];
  typeIndex: number = 1;
  form: FormGroup;
 
  async ngOnInit() {
    this.form = this.fb.group({
      operationName: ['', Validators.required],
      operationSubType: ['', Validators.required],
      doctorRemarks: ['', Validators.required]
    });

    const operationTypesRaw = await this.operationService.getOperationTypes();    
  let operationSubTypesTemp = new Map<number, OperationSubtype[]>();
  const operationTypesTemp: OperationType[] = [];
    operationTypesRaw.forEach(function (types){
      let operationSubTypesList:  OperationSubtype[] = [];
      types.subtypes.forEach(function (subtype){
        let newSubType: OperationSubtype = {
          operationSubType: subtype.operationSubType,
          operationTypeId: subtype.operationTypeId,
          cost: subtype.cost,
          operationSubTypeId: subtype.operationSubTypeId
        }
        operationSubTypesList.push(newSubType);
      });

      operationSubTypesTemp[types.operationTypeId] = operationSubTypesList;

      let newImagingType: OperationType = {
        operationTypeId: types.operationTypeId,
        operationName: types.operationName        
      }      
      operationTypesTemp.push(newImagingType);
    });

    this.operationTypes = operationTypesTemp;
    this.operationSubTypes = operationSubTypesTemp;
    
    // console.log(this.operationTypes);
    console.log("im here");
    console.log("types 0",this.operationTypes[0]);
    console.log("subtypes 0",this.operationSubTypes[this.operationTypes[0].operationTypeId]);
  }
  
  async onSubmit(){
    const formData = this.form.value;
    console.log("type: ",formData.operationName);  
    console.log("subtype",formData.operationSubType); 
    console.log("remarks",formData.doctorRemarks);

    if (this.form.valid) {
      const formData = this.form.value;
      let operationRequest: OperationRequest = {
        appointmentId: this.data.appointmentId,
        doctorRemarks: formData.doctorRemarks,
        operationSubType: formData.operationSubType,
        status: 0,
      }
      console.log("appointmentId",this.data.appointmentId);
      const res = await this.operationService.createOperationRequest(operationRequest);
      if(res){
        //laboratoryRequestData.labId = Number(res);
        console.log("operation: "+res); 
        this.dialogRef.close(res);
      }else{  

      }      
    }
  }
}

