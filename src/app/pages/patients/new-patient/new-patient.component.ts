import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenderService } from '../../../services/others/gender.service';
import { RelationshipService } from '../../../services/others/relationship.service';
import { ProjectsService } from '../../../services/patient-service.service';
import { PatientData, Patient } from '../../../models/Patient';
import { Gender } from '../../../models/Gender';
import { Relationship } from '../../../models/Relationship';
import { User } from '../../../models/User';
import { County, Subcounty, Wards } from '../../../models/Location';
import { LocationService } from '../../../services/others/location.service';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss']
})
export class NewPatientComponent implements OnInit {

  constructor(
    private fb: FormBuilder, 
    private ProjectsService: ProjectsService, 
    private GenderService: GenderService, 
      private RelationshipService: RelationshipService,
    private LocationService: LocationService
    ) { }


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
      await this.ProjectsService.addPatient(this.patientData);
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
