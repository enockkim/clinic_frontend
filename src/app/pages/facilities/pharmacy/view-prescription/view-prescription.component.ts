import { Component, ViewChild, ViewChildren, QueryList, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TransferAppointmentComponent } from '../../../../pages/appointments/transfer-appointment/transfer-appointment.component';
import { AppointmentService } from '../../../../services/appointment.service';
import { FacilityService } from '../../../../services/facility.service';
import { PaymentMethodService } from '../../../../services/payment-method.service';
import { Patient } from '../../../../models/Patient';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Appointment, AppointmentData } from 'app/models/Appointment';
import { PaymentMethod } from 'app/models/PaymentMethod';
import { Facility } from 'app/models/Facility';
import { MatSort } from '@angular/material/sort';
import { EditRemarksComponent } from '../../../../pages/appointments/edit-remarks/edit-remarks.component';
import { CreateLaboratoryRequestComponent } from '../../../../pages/facilities/laboratory/create-laboratory-request/create-laboratory-request.component';
import { CreateDiagnosticImagingRequestComponent } from '../../../../pages/facilities/diagnosticImaging/create-diagnostic-imaging-request/create-diagnostic-imaging-request.component';
import { CreateOperationRequestComponent } from '../../../../pages/facilities/operations/create-operation-request/create-operation-request.component';
import { CreatePrescriptionItemComponent } from '../../../../pages/facilities/pharmacy/create-prescription-item/create-prescription-item.component';
import { ServicesComponent } from '../../../../tabs/services/services.component';

@Component({
  selector: 'app-view-prescription',
  templateUrl: './view-prescription.component.html',
  styleUrls: ['./view-prescription.component.scss']
})
export class ViewPrescriptionComponent implements OnInit {


    @Input() appointmentType: number;
    @Input() appointmentStatus: number;
    @ViewChild('outerSort', { static: true }) sort: MatSort;
    @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
    //@ViewChildren('innerTables') innerTables: QueryList<MatTable<Address>>;
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

    //applyFilter(filterValue: string) {
    //    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Address>).filter = filterValue.trim().toLowerCase());
    //}


    async transferToPharmacy(appointmentData: AppointmentData) {
        appointmentData.appointmentStatus = 12;
        const res = await this.AppointmentService.tranferAppointment(appointmentData);
        if (res) {
            this.dataSource.data = this.appointments.filter(appointment => appointment.appointmentId != appointmentData.appointmentId);
        }
    }
}
