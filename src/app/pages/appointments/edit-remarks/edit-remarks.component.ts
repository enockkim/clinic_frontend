import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointment, AppointmentData } from 'app/models/Appointment';
import { AppointmentService } from '../../../services/appointment.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef  } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-remarks',
  templateUrl: './edit-remarks.component.html',
  styleUrls: ['./edit-remarks.component.scss']
})
export class EditRemarksComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: 
    {
      appointmentData: AppointmentData
    }, 
    private fb: FormBuilder, 
    private AppointmentService: AppointmentService, 
    dialog: MatDialog,
    public dialogRef: MatDialogRef<EditRemarksComponent>) { }
  
  form: FormGroup;

  ngOnInit(): void {
    console.log(this.data.appointmentData.appointmentId, this.data.appointmentData.patientName);
      this.form = this.fb.group({
          remarks: [this.data.appointmentData.remarks, Validators.required]
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.data.appointmentData.remarks = formData.remarks;
      const res = await this.AppointmentService.editAppointment(this.data.appointmentData);
      console.log("AppointmentId: "+this.data.appointmentData.appointmentId);
      if(res){
        this.dialogRef.close(this.data.appointmentData);
      }else{  

      }
      
    }
  }

}
