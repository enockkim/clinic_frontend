import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef  } from '@angular/material/dialog';
import { Appointment, AppointmentData } from 'app/models/Appointment';
import { Facility } from 'app/models/Facility';
import { PaymentMethod } from 'app/models/PaymentMethod';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../../../services/appointment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FacilityService } from '../../../services/facility.service';

@Component({
  selector: 'app-transfer-appointment',
  templateUrl: './transfer-appointment.component.html',
  styleUrls: ['./transfer-appointment.component.scss'],
  template: 'passed in {{ data.action_type, data.appointmentData }}',
})
export class TransferAppointmentComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { action_type: number, appointmentData: AppointmentData, facilities: Facility[], paymentMethods: PaymentMethod[] },
        private fb: FormBuilder,
        private AppointmentService: AppointmentService,
        private facilityService: FacilityService,
        dialog: MatDialog,
        private _snackBar: MatSnackBar,
        public dialogRef: MatDialogRef<TransferAppointmentComponent>
    ) { }

  form: FormGroup;
  // patientData = {} as PatientData;
  title: string = "Transfer";
  description: string = "Complete the form to transfer the patient.";
  button: string = "Transfer";
    response: Boolean;
    facilities: Facility[] = [];


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

        this.facilities = await this.facilityService.getFacilities();
      console.log("AppointmentId: "+this.data.appointmentData.appointmentId);
        if (res != 0) {
            var facilityName = this.facilities.find(facility => facility.facilityId === res).facilityName;
            this._snackBar.open('Patient transfered to .'+facilityName, 'Ok', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 5 * 1000,
            });
        this.dialogRef.close(this.data.appointmentData.appointmentId);
      }else{  
            this._snackBar.open('Error transferring.', 'Ok', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 5 * 1000,
            });
      }
      
    }
  }

}
