import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef  } from '@angular/material/dialog';
import { Appointment, AppointmentData } from 'app/models/Appointment';
import { Facility } from 'app/models/Facility';
import { PaymentMethod } from 'app/models/PaymentMethod';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../../../services/appointment.service';

@Component({
  selector: 'app-transfer-appointment',
  templateUrl: './transfer-appointment.component.html',
  styleUrls: ['./transfer-appointment.component.scss'],
  template: 'passed in {{ data.action_type, data.appointmentData }}',
})
export class TransferAppointmentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {action_type: number, appointmentData: AppointmentData, facilities: Facility[], paymentMethods: PaymentMethod[]}, private fb: FormBuilder, private AppointmentService: AppointmentService, dialog: MatDialog,public dialogRef: MatDialogRef<TransferAppointmentComponent>) { }

  form: FormGroup;
  // patientData = {} as PatientData;
  title: string = "Transfer";
  description: string = "Complete the form to transfer the patient.";
  button: string = "Transfer";
  response: Boolean;
  


  ngOnInit(): void {
    this.form = this.fb.group({
      paymentMethod: ['', Validators.required],
      facility: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.data.appointmentData.appointmentStatus = Number(formData.facility);
      this.data.appointmentData.paymentMethod = Number(formData.paymentMethod);
      const res = await this.AppointmentService.transferPatient(this.data.appointmentData);
      console.log("AppointmentId: "+this.data.appointmentData.appointmentId);
      if(res){
        this.dialogRef.close(this.data.appointmentData.appointmentId);
      }else{  

      }
      
    }
  }

}
