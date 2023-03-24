import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AppointmentService } from '../../../services/appointment.service';
import { Patient } from '../../../models/Patient';
import { MatTableDataSource } from '@angular/material/table';
import { Appointment } from 'app/models/Appointment';

// export interface PeriodicElement {
//   name: string;
//   pid: number;
//   gender: string;
//   national_id: number;
//   age: number;
// }

// const ELEMENT_DATA: PeriodicElement[] = [];


@Component({
  selector: 'app-view-appointments',
  templateUrl: './view-appointments.component.html',
  styleUrls: ['./view-appointments.component.scss']
})

export class ViewAppointmentsComponent implements OnInit {

  //constructor() {}

  constructor(public dialog: MatDialog, private AppointmentService: AppointmentService) {}

  // openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  //   this.dialog.open(EditAppointmentModalComponent, {
  //     width: "100%",
  //     height: ""
  //   });
  // }

  
  displayedColumns: string[] = ['appointmentId', 'patientId', 'employeeId', 'appointmentType', 'remarks'];
  clickedRows = new Set<Appointment>();
  
  dataSource = new MatTableDataSource<Appointment>();

  async ngOnInit() {

    const appointmentResult = await this.AppointmentService.getAppointments(0, 0);
    console.log("appointments"+appointmentResult.length);
    this.dataSource.data = appointmentResult;

  }

}