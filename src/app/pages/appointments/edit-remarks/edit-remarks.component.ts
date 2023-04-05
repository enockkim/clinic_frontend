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
        //this.data.appointmentData.remarks = formData.remarks;
        let appointmentData: Appointment = {
            patientId: this.data.appointmentData.patientId,
            employeeId: this.data.appointmentData.employeeId,
            dateOfAppointment: this.data.appointmentData.dateOfAppointment,
            remarks: formData.remarks,
            appointmentStatus: this.data.appointmentData.appointmentStatus,
            paymentMethod: this.data.appointmentData.paymentMethod,
            appointmentType: this.data.appointmentData.appointmentType,
            dateOfCreation: this.data.appointmentData.dateOfCreation,
            createdBy: this.data.appointmentData.createdBy,
            patientType: this.data.appointmentData.patientType,
            previousFacility: this.data.appointmentData.previousFacility
        }
      const res = await this.AppointmentService.editAppointment(appointmentData);
      console.log("AppointmentId: "+this.data.appointmentData.appointmentId);
      if(res){
        this.dialogRef.close(this.data.appointmentData);
      }else{  

      }
      
    }
  }

}
