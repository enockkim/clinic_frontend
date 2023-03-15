import { Component, OnInit, Inject } from '@angular/core';
import { DiagnositcImagingSubtype, DiagnositcImagingType, DiagnosticImagingRequest, ImagingType } from 'app/models/DiagnosticImaging';
import { DiagnositcImagingService } from 'app/services/facilities/diagnostic-imaging.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef  } from '@angular/material/dialog';

@Component({
  selector: 'app-create-diagnostic-imaging-request',
  templateUrl: './create-diagnostic-imaging-request.component.html',
  styleUrls: ['./create-diagnostic-imaging-request.component.scss']
})
export class CreateDiagnosticImagingRequestComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: 
    {
      appointmentId: number
    }, 
    private fb: FormBuilder,
    public diagnosticImagingService: DiagnositcImagingService,
    dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateDiagnosticImagingRequestComponent>
  ) { }

  imagingTypes: DiagnositcImagingType[] = [];
  imagingSubTypes: Map<number, DiagnositcImagingSubtype[]>; 
  //imagingSubTypesList: DiagnositcImagingSubtype[];
  typeIndex: number = 1;
  form: FormGroup;
 
  async ngOnInit() {
    this.form = this.fb.group({
      imagingType: ['', Validators.required],
      imagingSubType: ['', Validators.required],
      doctorRemarks: ['', Validators.required]
    });

    const imagingTypesRaw = await this.diagnosticImagingService.getImagingTypes();    
  let imagingSubTypesTemp = new Map<number, DiagnositcImagingSubtype[]>();
  const imagingTypesTemp: DiagnositcImagingType[] = [];
    imagingTypesRaw.forEach(function (types){
      let imagingSubTypesList:  DiagnositcImagingSubtype[] = [];
      types.subtypes.forEach(function (subtype){
        let newSubType: DiagnositcImagingSubtype = {
          imagingSubType: subtype.imagingSubType,
          imagingTypeId: subtype.imagingTypeId,
          cost: subtype.cost,
          imagingSubTypeId: subtype.imagingSubTypeId
        }
        imagingSubTypesList.push(newSubType);
      });

      imagingSubTypesTemp[types.imagingTypeId] = imagingSubTypesList;

      let newImagingType: DiagnositcImagingType = {
        imagingTypeId: types.imagingTypeId,
        imagingType: types.imagingType        
      }      
      imagingTypesTemp.push(newImagingType);
    });

    this.imagingTypes = imagingTypesTemp;
    this.imagingSubTypes = imagingSubTypesTemp;
    
    // console.log(this.imagingTypes);
    console.log("im here");
    console.log("types 0",this.imagingTypes[0]);
    console.log("subtypes 0",this.imagingSubTypes[this.imagingTypes[0].imagingTypeId]);
  }
  
  async onSubmit(){
    const formData = this.form.value;
    console.log("type: ",formData.imagingType);  
    console.log("subtype",formData.imagingSubType); 
    console.log("remarks",formData.doctorRemarks);

    if (this.form.valid) {
      const formData = this.form.value;
      let diagnositcImagingRequest: DiagnosticImagingRequest = {
        appointmentId: this.data.appointmentId,
        doctorRemarks: formData.doctorRemarks,
        imagingSubType: formData.imagingSubType,
        status: 0,
      }
      console.log("appointmentId",this.data.appointmentId);
      const res = await this.diagnosticImagingService.createDiagnosticImagingRequest(diagnositcImagingRequest);
      if(res){
        //laboratoryRequestData.labId = Number(res);
        console.log("lab: "+res); 
        this.dialogRef.close(res);
      }else{  

      }      
    }
  }
}

