import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NewAppointmentComponent} from '../new-appointment/new-appointment.component';
import {TransferAppointmentComponent} from '../transfer-appointment/transfer-appointment.component';
import { AppointmentService } from '../../../services/appointment.service';
import { FacilityService } from '../../../services/facility.service';
import { PaymentMethodService } from '../../../services/payment-method.service';
import { Patient } from '../../../models/Patient';
import { MatTableDataSource } from '@angular/material/table';
import { Appointment, AppointmentData } from 'app/models/Appointment';
import { PaymentMethod } from 'app/models/PaymentMethod';
import { Facility } from 'app/models/Facility';


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})

export class AppointmentsComponent implements OnInit {

  constructor(
    public dialog: MatDialog, 
    private AppointmentService: AppointmentService,
    private PaymentMethodService: PaymentMethodService,    
    private FacilityService: FacilityService
     ) {}

  appointmentResult: AppointmentData[];
  paymentMethodResult: PaymentMethod[];
  facilitiesResult: Facility[];

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, action_type: number): void {
    this.dialog.open(NewAppointmentComponent, {
      data: { action_type: action_type },
      width: "50%",
      height: "",
    });
  }

  
  openTransferDialog(enterAnimationDuration: string, exitAnimationDuration: string, action_type: number, appointmentResult: AppointmentData): void {
    // console.log(appointment.appointmentId);
    const dial = this.dialog.open(TransferAppointmentComponent, {
      data: { action_type: action_type, appointmentData: appointmentResult, facilities: this.facilitiesResult, paymentMethods: this.paymentMethodResult },
      width: "50%",
      height: "",
    });

    dial.afterClosed()
    .subscribe(res => {
      console.log("dialogres: "+res);
      this.dataSource.data = this.appointmentResult.filter(appointment => appointment.appointmentId != res);
    })
  }

  displayedColumns: string[] = ['number', 'patientNumber', 'patientName', 'doctor', 'type', 'date','remarks', 'actions'];

  clickedRows = new Set<AppointmentData>();
  dataSource = new MatTableDataSource<AppointmentData>();

  async ngOnInit() {
    
    this.appointmentResult = await this.AppointmentService.getAppointments(0, 0);
    console.log("appointments"+this.appointmentResult.length);
    this.dataSource.data = this.appointmentResult;

    this.paymentMethodResult = await this.PaymentMethodService.getPaymentMethods();
    this.facilitiesResult = await this.FacilityService.getFacilities();
  }
}


