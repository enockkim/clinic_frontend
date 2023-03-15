
import { Component, ViewChild, ViewChildren, QueryList, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TransferAppointmentComponent} from '../../pages/appointments/transfer-appointment/transfer-appointment.component';
import { AppointmentService } from '../../services/appointment.service';
import { FacilityService } from '../../services/facility.service';
import { PaymentMethodService } from '../../services/payment-method.service';
import { Patient } from '../../models/Patient';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Appointment, AppointmentData } from 'app/models/Appointment';
import { PaymentMethod } from 'app/models/PaymentMethod';
import { Facility } from 'app/models/Facility';
import { MatSort } from '@angular/material/sort';
import { EditRemarksComponent } from '../../pages/appointments/edit-remarks/edit-remarks.component';
import { CreateLaboratoryRequestComponent } from '../../pages/facilities/laboratory/create-laboratory-request/create-laboratory-request.component';
import { CreateDiagnosticImagingRequestComponent } from '../../pages/facilities/diagnosticImaging/create-diagnostic-imaging-request/create-diagnostic-imaging-request.component';
import { ServicesComponent } from '../services/services.component';


@Component({
  selector: 'app-appointments-data',
  templateUrl: './appointments-data.component.html',
  styleUrls: ['./appointments-data.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class AppointmentsDataComponent implements OnInit {

  @Input() appointmentType: number;
  @Input() appointmentStatus: number;
  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<Address>>;  
  @ViewChild(ServicesComponent) servicesComponent: ServicesComponent;

  dataSource: MatTableDataSource<AppointmentData>;
  usersData: AppointmentData[] = [];
  columnsToDisplay: string[] = ['appointmentId', 'patientId', 'patientName', 'employeeName', 'remarks', 'actions'];
  //innerDisplayedColumns = ['street', 'zipCode', 'city'];
  expandedElement: AppointmentData | null;
  appointmentId: number;
 
  constructor(
    public dialog: MatDialog, 
    private cd: ChangeDetectorRef,    
    private AppointmentService: AppointmentService
  ) { }

  appointments: AppointmentData[];
  
  async ngOnInit() {
    // USERS.forEach(user => {
    //     this.usersData = [...this.usersData, {...user, addresses: new MatTableDataSource(user.addresses)}];
    // });
    this.appointments = await this.AppointmentService.getAppointments(this.appointmentType, this.appointmentStatus)  
    this.dataSource = new MatTableDataSource(this.appointments);
    this.dataSource.sort = this.sort;
  }

  toggleRow(element: AppointmentData) {

    this.appointmentId = element.appointmentId;
    this.expandedElement = element;
    console.log('');
    // element.addresses && (element.addresses as MatTableDataSource<Address>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    // this.cd.detectChanges();
    // this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Address>).sort = this.innerSort.toArray()[index]);
  }

  applyFilter(filterValue: string) {
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Address>).filter = filterValue.trim().toLowerCase());
  }

  
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, appointmentData: AppointmentData): void {
    const dial = this.dialog.open(EditRemarksComponent, {
      data: { appointmentData: appointmentData },
      width: "50%",
      height: "",
    });

    dial.afterClosed()
    .subscribe(res => {
      console.log("edit appointment result: "+res);
      if(res){
        //find the index of the updated element
        const index = this.appointments.findIndex(appointment => appointment.appointmentId === appointmentData.appointmentId);
        // replace the element at that index with the updated appointment data
        if (index !== -1) {
          this.appointments[index] = res;
        }
      }
    })
  }

  createLabRequestDialog(appointmentData: AppointmentData){
    const dial = this.dialog.open(CreateLaboratoryRequestComponent, {
      data: { appointmentId: appointmentData.appointmentId },
      width: "50%",
      height: "",
    });

    dial.afterClosed()
    .subscribe(res => {
      console.log("add imaging result, labid: "+res.imagingRequestId);
      if(res){
        //find the index of the updated element
        const index = this.appointments.findIndex(appointment => appointment.appointmentId === appointmentData.appointmentId);
        // replace the element at that index with the updated appointment data
        if (index !== -1) {
          this.appointments[index] = res;
          const labreq = res;
          // this.servicesComponent.getData(2, appointmentData.appointmentId);
          this.toggleRow(appointmentData);
        }
      }
    })
  }

  
  createDiagnosticImagingDialog(appointmentData: AppointmentData){
    console.log("calling dialog",appointmentData.appointmentId);
    const dial = this.dialog.open(CreateDiagnosticImagingRequestComponent, {
      data: { appointmentId: appointmentData.appointmentId },
      width: "50%",
      height: "",
    });

    dial.afterClosed()
    .subscribe(res => {
      console.log("add lab result, labid: "+res.labId);
      if(res){
        //find the index of the updated element
        const index = this.appointments.findIndex(appointment => appointment.appointmentId === appointmentData.appointmentId);
        // replace the element at that index with the updated appointment data
        if (index !== -1) {
          this.appointments[index] = res;
          const labreq = res;
          // this.servicesComponent.getData(2, appointmentData.appointmentId);
          this.toggleRow(appointmentData);
        }
      }
    })
  }

  
  createOperationRequest(appointmentData: AppointmentData){
    console.log("calling dialog",appointmentData.appointmentId);
    const dial = this.dialog.open(CreateDiagnosticImagingRequestComponent, {
      data: { appointmentId: appointmentData.appointmentId },
      width: "50%",
      height: "",
    });

    dial.afterClosed()
    .subscribe(res => {
      console.log("add operation result, labid: "+res.labId);
      if(res){
        //find the index of the updated element
        const index = this.appointments.findIndex(appointment => appointment.appointmentId === appointmentData.appointmentId);
        // replace the element at that index with the updated appointment data
        if (index !== -1) {
          this.appointments[index] = res;
          const labreq = res;
          // this.servicesComponent.getData(2, appointmentData.appointmentId);
          this.toggleRow(appointmentData);
        }
      }
    })
  }

  async transferAppointment(appointmentData: AppointmentData){
    appointmentData.appointmentStatus = 3;
    const res = await this.AppointmentService.tranferAppointment(appointmentData);
    if(res){
      this.dataSource.data = this.appointments.filter(appointment => appointment.appointmentId != appointmentData.appointmentId);
    }
  }

  async transferToDiagnosticImaging(appointmentData: AppointmentData){
    appointmentData.appointmentStatus = 4;
    const res = await this.AppointmentService.tranferAppointment(appointmentData);
    if(res){
      this.dataSource.data = this.appointments.filter(appointment => appointment.appointmentId != appointmentData.appointmentId);
    }
  }
  
  async transferToOperations(appointmentData: AppointmentData){
    appointmentData.appointmentStatus = 5;
    const res = await this.AppointmentService.tranferAppointment(appointmentData);
    if(res){
      this.dataSource.data = this.appointments.filter(appointment => appointment.appointmentId != appointmentData.appointmentId);
    }
  }
}

export interface User {
  name: string;
  email: string;
  phone: string;
  addresses?: Address[] | MatTableDataSource<Address>;
}

export interface Address {
  street: string;
  zipCode: string;
  city: string;
}

export interface UserDataSource {
  name: string;
  email: string;
  phone: string;
  addresses?: MatTableDataSource<Address>;
}

const USERS: User[] = [
  {
    name: "Mason",
    email: "mason@test.com",
    phone: "9864785214",
    addresses: [
      {
        street: "Street 1",
        zipCode: "78542",
        city: "Kansas"
      },
      {
        street: "Street 2",
        zipCode: "78554",
        city: "Texas"
      }
    ]
  },
  {
    name: "Eugene",
    email: "eugene@test.com",
    phone: "8786541234",
  },
  {
    name: "Jason",
    email: "jason@test.com",
    phone: "7856452187",
    addresses: [
      {
        street: "Street 5",
        zipCode: "23547",
        city: "Utah"
      },
      {
        street: "Street 5",
        zipCode: "23547",
        city: "Ohio"
      }
    ]
  }
];
