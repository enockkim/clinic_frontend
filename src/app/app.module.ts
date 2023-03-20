import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { NewPatientComponent } from './pages/patients/new-patient/new-patient.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ViewPatientsComponent } from './pages/patients/view-patients/view-patients.component';
import { MatTableModule } from '@angular/material/table';  
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon'; 

import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

import { EditPatientModalComponent } from './pages/patients/edit-patient-modal/edit-patient-modal.component';
import { NewEmployeeComponent } from './pages/employees/new-employee/new-employee.component';
import { ViewEmployeesComponent } from './pages/employees/view-employees/view-employees.component';
import { EditEmployeeModalComponent } from './pages/employees/edit-employee-modal/edit-employee-modal.component';
import { ViewAppointmentsComponent } from './pages/appointments/view-appointments/view-appointments.component';
import { NewAppointmentComponent } from './pages/appointments/new-appointment/new-appointment.component';
import { DentalComponent } from './pages/facilities/dental/dental.component';
import { AppointmentsDataComponent } from './tabs/appointments-data/appointments-data.component';
import {MatSortModule} from '@angular/material/sort';
import { AppointmentsComponent } from './pages/appointments/appointments/appointments.component';
import {MatButtonModule} from '@angular/material/button';
import { TransferAppointmentComponent } from './pages/appointments/transfer-appointment/transfer-appointment.component';
import { ServicesComponent } from './tabs/services/services.component';
import { EditRemarksComponent } from './pages/appointments/edit-remarks/edit-remarks.component';
import { CreateLaboratoryRequestComponent } from './pages/facilities/laboratory/create-laboratory-request/create-laboratory-request.component';
import { BillingComponent } from './pages/finance/billing/billing.component';
import { PayBillComponent } from './pages/finance/pay-bill/pay-bill.component';
import { ViewLaboratoryComponent } from './pages/facilities/laboratory/view-laboratory/view-laboratory.component';
import { RequestsComponent } from './pages/facilities/requests/requests.component';
import { CreateDiagnosticImagingRequestComponent } from './pages/facilities/diagnosticImaging/create-diagnostic-imaging-request/create-diagnostic-imaging-request.component';
import { ViewDiagnosticImagingRequestComponent } from './pages/facilities/diagnosticImaging/view-diagnostic-imaging-request/view-diagnostic-imaging-request.component';
import { CreateOperationRequestComponent } from './pages/facilities/operations/create-operation-request/create-operation-request.component';
import { ViewOperationRequestComponent } from './pages/facilities/operations/view-operation-request/view-operation-request.component';
import { CreatePrescriptionItemComponent } from './pages/facilities/pharmacy/create-prescription-item/create-prescription-item.component';
import { ViewPrescriptionComponent } from './pages/facilities/pharmacy/view-prescription/view-prescription.component';
import { ActivePatientsComponent } from './reports/patients/active-patients/active-patients.component';
import { ReceiptComponent } from './pages/finance/receipt/receipt.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatTabsModule,
    MatIconModule,
    MatSortModule,
    MatButtonModule,
    NgxExtendedPdfViewerModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    NewPatientComponent,
    ViewPatientsComponent,
    EditPatientModalComponent,
    NewEmployeeComponent,
    ViewEmployeesComponent,
    EditEmployeeModalComponent,
    ViewAppointmentsComponent,
    NewAppointmentComponent,
    DentalComponent,
    AppointmentsDataComponent,
    AppointmentsComponent,
    TransferAppointmentComponent,
    ServicesComponent,
    EditRemarksComponent,
    CreateLaboratoryRequestComponent,
    BillingComponent,
    PayBillComponent,
    ViewLaboratoryComponent,
    RequestsComponent,
    CreateDiagnosticImagingRequestComponent,
    ViewDiagnosticImagingRequestComponent,
    CreateOperationRequestComponent,
    ViewOperationRequestComponent,
    CreatePrescriptionItemComponent,
    ViewPrescriptionComponent,
    ActivePatientsComponent,
    ReceiptComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
