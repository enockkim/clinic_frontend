import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenderService } from '../../../services/others/gender.service';
import { RelationshipService } from '../../../services/others/relationship.service';
import { ProjectsService } from '../../../services/patient-service.service';
import { PatientData, Patient } from '../../../models/Patient';
import { Gender } from '../../../models/Gender';
import { Relationship } from '../../../models/Relationship';
import { User } from '../../../models/User';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { County, Subcounty, Wards } from '../../../models/Location';
import { LocationService } from '../../../services/others/location.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NextOfKin } from 'app/models/NextOfKin';

@Component({
  selector: 'app-edit-patient-modal',
  templateUrl: './edit-patient-modal.component.html',
  styleUrls: ['./edit-patient-modal.component.scss']
})
export class EditPatientModalComponent implements OnInit {


    constructor(
        private fb: FormBuilder,
        private ProjectsService: ProjectsService,
        private GenderService: GenderService,
        private RelationshipService: RelationshipService,
        @Inject(MAT_DIALOG_DATA) public data: { patientData: Patient },
        dialog: MatDialog,
        public dialogRef: MatDialogRef<EditPatientModalComponent>,
        private LocationService: LocationService,
        private _snackBar: MatSnackBar,
    ) { }


    patientData = {} as PatientData;
    userData = {} as User;
    genders: Gender[];
    relationships: Relationship[];
    counties: County[];
    subcounties: Subcounty[];
    subcountiesFiltered: Subcounty[];
    wards: Wards[];
    wardsFiltered: Wards[];
    countyIndex: number = this.data.patientData.county;
    subcountyIndex: number = this.data.patientData.subcounty;
    form: FormGroup;

    subcounty(countyId: number) {
        this.subcountiesFiltered = this.subcounties.filter(s => s.id == countyId);
    }
    ward(subcountyId: number) {
        this.wardsFiltered = this.wards.filter(s => s.id == subcountyId);
    }

    async ngOnInit() {

        this.form = this.fb.group({
            patientId: [this.data.patientData.id, Validators.required],
            email: [this.data.patientData.email, [Validators.required, Validators.email]],
            surname: [this.data.patientData.surname, Validators.required],
            otherName: [this.data.patientData.other_names, Validators.required],
            nationalIdNumber: [this.data.patientData.national_id_number, Validators.required],
            contact: [this.data.patientData.contact, Validators.required],
            gender: [this.data.patientData.fk_gender_id, Validators.required],
            dob: [this.data.patientData.date_of_birth, Validators.required],
            nokName: [this.data.patientData.next_of_kin.name, Validators.required],
            nokContact: [this.data.patientData.next_of_kin.contact, Validators.required],
            nokNationalIdNumber: [this.data.patientData.next_of_kin.national_id_number, Validators.required],
            nokRelationship: [this.data.patientData.next_of_kin.fk_relationship_id, Validators.required],
            county: ['', Validators.required],
            subcounty: ['', Validators.required],
            ward: ['', Validators.required]
        });    

            this.genders = await this.GenderService.getGenders();
            this.relationships = await this.RelationshipService.getRelationships();
            this.counties = await this.LocationService.getCounties();
            this.subcounties = await this.LocationService.getSubCounties();
            this.wards = await this.LocationService.getWards();

        this.form.controls['county'].setValue(this.data.patientData.county);
        this.form.controls['subcounty'].setValue(this.data.patientData.subcounty);
        this.form.controls['ward'].setValue(this.data.patientData.ward);

    }

    logData() {
        console.log(this.form.value);
    }

    async onSubmit() {
        console.log(this.form.value);
        if (this.form.valid) {
            const formData = this.form.value;
            let next_of_kin: NextOfKin = {
                id: 0,
                name: formData.nokName,
                contact: Number(formData.nokContact),
                national_id_number: formData.nokNationalIdNumber,
                fk_relationship_id: formData.nokRelationship
            }
            let patient: Patient = {
                id: Number(formData.patientId),
                surname: formData.surname,
                other_names: formData.otherName,
                fk_gender_id: formData.gender,
                contact: Number(formData.contact),
                date_of_birth: formData.dob,
                next_of_kin: next_of_kin,
                national_id_number: formData.nationalIdNumber,
                county: Number(formData.county),
                subcounty: Number(formData.subcounty),
                ward: Number(formData.ward),
                status: 1,
                email: formData.email
            }
            this.userData.Id = "3342-2342-324";
            this.userData.UserName = "username";
            this.patientData.patientData = patient;
            this.patientData.userData = this.userData;

            

            if (await this.ProjectsService.updatePatient(this.patientData)) {
                this._snackBar.open('Patient updated sucessfully.', 'Ok', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    duration: 5 * 1000,
                });
            } else {
                this._snackBar.open('Error updating patient.', 'Ok', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    duration: 5 * 1000,
                });
            }
            // .subscribe(res => {
            //   console.log('Data has been sent successfully');
            // }, error => {
            //   console.error('Error while sending data');
            // });
        } else {
            // log validation errors to console
            Object.keys(this.form.controls).forEach(key => {
                const controlErrors = this.form.controls[key].errors;
                if (controlErrors != null) {
                    Object.keys(controlErrors).forEach(keyError => {
                        console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
                    });
                }
            });
        }
    }

}
