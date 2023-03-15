import { Component, OnInit, Inject } from '@angular/core';
import { LaboratoryService } from '../../../../services/facilities/laboratory.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef  } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LaboratoryRequest, LaboratoryTypes } from 'app/models/Laboratory';


@Component({
  selector: 'app-create-laboratory-request',
  templateUrl: './create-laboratory-request.component.html',
  styleUrls: ['./create-laboratory-request.component.scss']
})
export class CreateLaboratoryRequestComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: 
    {
      appointmentId: number
    }, 
    private fb: FormBuilder,
    private LaboratoryService: LaboratoryService,
    dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateLaboratoryRequestComponent>
  ) { }
  
  form: FormGroup;
  labTypes: LaboratoryTypes[];

  async ngOnInit() {
    this.form = this.fb.group({
      labType: ['', Validators.required],
      doctorRemarks: ['', Validators.required]
    });

    this.labTypes = await this.LaboratoryService.getLabTypes();
  }

  async onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      let laboratoryRequestData: LaboratoryRequest = {
        labTypeId: formData.labType,
        appointmentId: this.data.appointmentId,
        doctorRemarks: formData.doctorRemarks,
        status: 0,
      }
      const res = await this.LaboratoryService.createLaboratoryRequest(laboratoryRequestData);
      if(res){
        //laboratoryRequestData.labId = Number(res);
        console.log("lab: "+res);
        this.dialogRef.close(res);
      }else{  

      }      
    }
  }
}
