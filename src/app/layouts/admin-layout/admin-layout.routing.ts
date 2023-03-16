import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import { NewPatientComponent } from '../../pages/patients/new-patient/new-patient.component';
import { ViewPatientsComponent } from '../../pages/patients/view-patients/view-patients.component';
import { NewEmployeeComponent } from 'app/pages/employees/new-employee/new-employee.component';
import { ViewEmployeesComponent } from 'app/pages/employees/view-employees/view-employees.component';
import { NewAppointmentComponent } from 'app/pages/appointments/new-appointment/new-appointment.component';
import { ViewAppointmentsComponent } from 'app/pages/appointments/view-appointments/view-appointments.component';
import { DentalComponent } from 'app/pages/facilities/dental/dental.component';
import { AppointmentsDataComponent } from 'app/tabs/appointments-data/appointments-data.component';
import { BillingComponent } from 'app/pages/finance/billing/billing.component';
import { ViewLaboratoryComponent } from 'app/pages/facilities/laboratory/view-laboratory/view-laboratory.component';
import { ViewDiagnosticImagingRequestComponent } from 'app/pages/facilities/diagnosticImaging/view-diagnostic-imaging-request/view-diagnostic-imaging-request.component';
import { ViewOperationRequestComponent } from 'app/pages/facilities/operations/view-operation-request/view-operation-request.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'new-patient',    component: NewPatientComponent},
    { path: 'view-patients',    component: ViewPatientsComponent},
    { path: 'new-employee',    component: NewEmployeeComponent},
    { path: 'view-employees',    component: ViewEmployeesComponent},
    { path: 'view-appointments',    component: ViewAppointmentsComponent},
    { path: 'dental',    component: DentalComponent},
    { path: 'appointment-data',    component: DentalComponent},
    { path: 'billing',    component: BillingComponent},    
    { path: 'laboratory',    component: ViewLaboratoryComponent},
    { path: 'diagnostic-imaging',    component: ViewDiagnosticImagingRequestComponent},
    { path: 'operations',   component: ViewOperationRequestComponent}
];
