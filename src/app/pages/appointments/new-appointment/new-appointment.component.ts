import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appointment, AppointmentData, AppointmentTypes } from '../../../models/Appointment';
import { Patient, PatientData } from '../../../models/Patient';
import { AppointmentService } from '../../../services/appointment.service';

@Component({
    selector: 'app-new-appointment',
    templateUrl: './new-appointment.component.html',
    styleUrls: ['./new-appointment.component.scss'],
    template: 'passed in {{ data.action_type }}',
})

export class NewAppointmentComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data:
            {
                action_type: number,
                appointmentData?: AppointmentData,
                patientData?: Patient
            },
        dialog: MatDialog,
        private _snackBar: MatSnackBar,
        public dialogRef: MatDialogRef<NewAppointmentComponent>,
        private fb: FormBuilder,
        private appointmentService: AppointmentService
    ) { }


    title: string;
    description: string;
    button: string;
    appointmentTypes: AppointmentTypes[] = [];
    form: FormGroup;

    async ngOnInit() {

        switch (this.data.action_type) {
            case 1:
                this.title = "Edit Appointment";
                this.description = "Fill the following form to edit an appointment.";
                this.button = "Update";
                console.log(this.data.patientData);
                this.form = this.fb.group({
                    patientId: [this.data.appointmentData.patientId, Validators.required],
                    patientName: [this.data.appointmentData.patientName, Validators.required],
                    appointmentType: [this.data.appointmentData.appointmentType, Validators.required],
                    dateOfAppointment: [this.data.appointmentData.dateOfAppointment, Validators.required],
                    //paymentMethod: [this.data.appointmentData.paymentMethod, Validators.required], //TODO add later
                    remarks: [this.data.appointmentData.remarks, Validators.required]
                });
                break;
            case 2:
                this.title = "Transfer Appointment";
                this.description = "Confirm details befor transfering appointment.";
                this.button = "Transfer"
                break;
            default:
                this.title = "Create New Appointment";
                this.description = "Fill the following form to create a new appointment.";
                this.button = "Create";
                console.log(this.data.patientData);
                this.form = this.fb.group({
                    patientId: [this.data.patientData.patientId, Validators.required],
                    patientName: [this.data.patientData.surname + ', ' + this.data.patientData.otherName, Validators.required],
                    appointmentType: ['', Validators.required],
                    dateOfAppointment: ['', Validators.required],
                    //paymentMethod: [this.data.appointmentData.paymentMethod, Validators.required], //TODO add later
                    remarks: ['', Validators.required]
                });
                break;
        }


        this.appointmentTypes = await this.appointmentService.getAppointmentTypes();


    }
    async onSubmit() {
        switch (this.data.action_type) {
            case 1: if (this.form.valid) {
                const formData = this.form.value;
                let appointmentData: Appointment = {
                    appointmentId: this.data.appointmentData.appointmentId,
                    patientId: this.data.appointmentData.patientId,
                    employeeId: this.data.appointmentData.employeeId,
                    dateOfAppointment: formData.dateOfAppointment,
                    remarks: formData.remarks,
                    appointmentStatus: this.data.appointmentData.appointmentStatus,
                    paymentMethod: this.data.appointmentData.paymentMethod,
                    appointmentType: formData.appointmentType,
                    dateOfCreation: this.data.appointmentData.dateOfCreation,
                    createdBy: this.data.appointmentData.createdBy,
                    patientType: this.data.appointmentData.patientType,
                    previousFacility: this.data.appointmentData.previousFacility
                }
                var res = await this.appointmentService.editAppointment(appointmentData);

                if (res) {
                    this._snackBar.open('Appointment updating sucessfully.', 'Ok', {
                        horizontalPosition: 'center',
                        verticalPosition: 'top',
                        duration: 5 * 1000,
                    });
                    this.dialogRef.close(appointmentData);
                } else {
                    this._snackBar.open('Error updating appointment.', 'Ok', {
                        horizontalPosition: 'center',
                        verticalPosition: 'top',
                        duration: 5 * 1000,
                    });
                }

            }
                break;
            case 2:
                break;
            case 3:
                if (this.form.valid) {
                    const formData = this.form.value;
                    let appointmentData: Appointment = {
                        patientId: this.data.patientData.patientId,
                        employeeId: 0,
                        dateOfAppointment: formData.dateOfAppointment,
                        remarks: formData.remarks,
                        appointmentStatus: 0,
                        paymentMethod: 0,
                        appointmentType: formData.appointmentType,
                        dateOfCreation: new Date,
                        createdBy: '',
                        patientType: 0,
                        previousFacility: 0
                    }
                    var res = await this.appointmentService.addAppointment(appointmentData);

                    if (res) {
                        this._snackBar.open('Appointment created.', 'Ok', {
                            horizontalPosition: 'center',
                            verticalPosition: 'top',
                            duration: 5 * 1000,
                        });
                        this.dialogRef.close();
                    } else {
                        this._snackBar.open('Error creating appointment.', 'Ok', {
                            horizontalPosition: 'center',
                            verticalPosition: 'top',
                            duration: 5 * 1000,
                        });
                    }

                }
        }
    }

}
