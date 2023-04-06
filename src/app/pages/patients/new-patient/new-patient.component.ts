import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GenderService } from '../../../services/others/gender.service';
import { RelationshipService } from '../../../services/others/relationship.service';
import { ProjectsService } from '../../../services/patient-service.service';
import { PatientData, Patient } from '../../../models/Patient';
import { Gender } from '../../../models/Gender';
import { Relationship } from '../../../models/Relationship';
import { User } from '../../../models/User';
import { County, Subcounty, Wards } from '../../../models/Location';
import { LocationService } from '../../../services/others/location.service';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
//import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

//import * as _moment from 'moment';
//import { default as _rollupMoment } from 'moment';
//const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'LL',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
    styleUrls: ['./new-patient.component.scss'],
    //providers: [
    //    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    //    // application's root module. We provide it at the component level here, due to limitations of
    //    // our example generation script.
    //    {
    //        provide: DateAdapter,
    //        useClass: MomentDateAdapter,
    //        deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    //    },

    //    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    //],
})

export class NewPatientComponent implements OnInit {

  constructor(
    private fb: FormBuilder, 
    private ProjectsService: ProjectsService, 
    private GenderService: GenderService, 
      private RelationshipService: RelationshipService,
      private LocationService: LocationService,
      private _snackBar: MatSnackBar,
    ) { }

    //date = new FormControl(moment());

  form: FormGroup;
  patientData = {} as PatientData;
  userData = {} as User;
  genders: Gender[];
    relationships: Relationship[];
    counties: County[];
    subcounties: Subcounty[];
    subcountiesFiltered: Subcounty[];
    wards: Wards[];
    wardsFiltered: Wards[];

    otherName = "";
    surname = "";
    nokName = "";
    countyIndex: number;
    subcountyIndex: number;

  async ngOnInit() {
    

    this.form = this.fb.group({
      // name: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]]
      surname: ['', Validators.required],
      otherName: ['', Validators.required],
      nationalIdNumber: ['', Validators.required],
      contact: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      nokName: ['', Validators.required],
      nokContact: ['', Validators.required],
        nokRelationship: ['', Validators.required],
        nokNationalIdNumber: ['', Validators.required],
      county: ['', Validators.required],
      subcounty: ['', Validators.required],
        ward: ['', Validators.required],
        email: ['', Validators.required]
    });

    
    this.genders = await this.GenderService.getGenders();
      this.relationships = await this.RelationshipService.getRelationships();
      this.counties = await this.LocationService.getCounties();
      this.subcounties = await this.LocationService.getSubCounties();
      this.wards = await this.LocationService.getWards();

  }

  logData() {
    console.log(this.form.value);
    }

    subcounty(countyId: number) {
        console.log(countyId);
        this.subcountiesFiltered = this.subcounties.filter(s => s.countyId == countyId)
    }
    ward(subcountyId: number) {
        console.log(subcountyId);
        this.wardsFiltered = this.wards.filter(s => s.subcountyId == subcountyId)
    }

  async onSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {
      const formData = this.form.value;
      let patient: Patient = {
        surname: formData.surname,
        otherName: formData.otherName,
        gender: formData.gender,
        contact: Number(formData.contact),
        dob: formData.dob,
        nokName: formData.nokName,
        nokContact: Number(formData.nokContact),
          nokRelationship: formData.nokRelationship,
          nokNationalIdNumber: formData.nokNationalIdNumber,
        nationalIdNumber: formData.nationalIdNumber,
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
        const res = await this.ProjectsService.addPatient(this.patientData);

        if (res != null) {
            this._snackBar.open('Patient added sucessfully.', 'Ok', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 5 * 1000,
            });
            this.form.reset();
        } else {
            this._snackBar.open('Error adding patient.', 'Ok', {
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
