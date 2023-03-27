import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentService } from '../../../services/appointment.service';

@Component({
  selector: 'app-clear-appointment',
  templateUrl: './clear-appointment.component.html',
  styleUrls: ['./clear-appointment.component.scss']
})
export class ClearAppointmentComponent implements OnInit {

    constructor(
        private appointmentService: AppointmentService,
        dialog: MatDialog,
        public dialogRef: MatDialogRef<ClearAppointmentComponent>,
        @Inject(MAT_DIALOG_DATA) public data:
            {
                appointmentId: number
            }
    ) { }

  ngOnInit(): void {
  }

    async clearPatient() {
        const res = await this.appointmentService.clearPatient(this.data.appointmentId);
        if (res) {
            this.dialogRef.close(res);
        } else {
            //TODO add error message
        }
    }

}
