import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
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
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})

export class AppointmentsComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog, 
    private AppointmentService: AppointmentService,
    private PaymentMethodService: PaymentMethodService,    
    private FacilityService: FacilityService
     ) {}

  appointmentResult: AppointmentData[];
  paymentMethodResult: PaymentMethod[];
  facilitiesResult: Facility[];

    openDialog(enterAnimationDuration: string, exitAnimationDuration: string, action_type: number, element: AppointmentData): void {
    const dial = this.dialog.open(NewAppointmentComponent, {
        data: { action_type: action_type, appointmentData: element },
      width: "50%",
      height: "",
    });

        dial.afterClosed()
            .subscribe(updatedAppointment => {
                console.log("appointmentData: " + updatedAppointment);
                this.dataSource.data.forEach(function (appointment) {
                    if (appointment.appointmentId == updatedAppointment.appointmentId) {
                        appointment.dateOfAppointment = updatedAppointment.dateOfAppointment,
                        appointment.remarks = updatedAppointment.remarks,
                        appointment.appointmentType = updatedAppointment.appointmentType
                    }
                })
            })
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

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}


