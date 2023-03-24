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
import { PharmacyService } from '../../../../services/facilities/pharmacy.service';

@Component({
  selector: 'app-view-prescription',
  templateUrl: './view-prescription.component.html',
    styleUrls: ['./view-prescription.component.scss'],
  animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class ViewPrescriptionComponent implements OnInit {


    appointmentType: number = 1;
    appointmentStatus: number = 12;
    @ViewChild('outerSort', { static: true }) sort: MatSort;
    @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
    //@ViewChildren('innerTables') innerTables: QueryList<MatTable<Address>>;
    @ViewChild(ServicesComponent) servicesComponent: ServicesComponent;

    DataSource: MatTableDataSource<AppointmentData>;
    DetailDataSource;
    prescriptionDataSource;
    Data: AppointmentData[] = [];
    DetailData;
    DataColumnsToDisplay: string[] = ['appointmentId', 'patientId', 'patientName', 'employeeName', 'remarks', 'actions'];
    DetailsColumnsToDisplay = ['itemId', 'dosageNumber', 'remarks', 'availability']

    columnsToDisplayWithExpand = [...this.DataColumnsToDisplay, 'expand'];
    //DetailsColumnsToDisplay: string[];  
    expandedElement: AppointmentData | null;
    appointmentId: number;

    constructor(
        public dialog: MatDialog,
        private cd: ChangeDetectorRef,
        private AppointmentService: AppointmentService,
        private PharmacyService: PharmacyService
    ) { }

    appointments: AppointmentData[];

    async ngOnInit() {
        // USERS.forEach(user => {
        //     this.usersData = [...this.usersData, {...user, addresses: new MatTableDataSource(user.addresses)}];
        // });
        this.Data = await this.AppointmentService.getAppointments(this.appointmentType, this.appointmentStatus)
        this.DataSource = new MatTableDataSource(this.Data);
        //this.DataSource.sort = this.sort;
    }

    async toggleRow(element: AppointmentData) {

        //this.appointmentId = element.appointmentId;
        //this.expandedElement = element;
        console.log('');

        this.prescriptionDataSource = await this.PharmacyService.getPrescriptionsByAppointmentId(element.appointmentId);
        this.DetailDataSource = new MatTableDataSource(this.prescriptionDataSource);
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
            this.DataSource.data = this.appointments.filter(appointment => appointment.appointmentId != appointmentData.appointmentId);
        }
    }
}
