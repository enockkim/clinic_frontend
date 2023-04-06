import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Desigation, Employee, EmployeeData, EmploymentType } from '../../../models/Employee';
import { Gender } from '../../../models/Gender';
import { Relationship } from '../../../models/Relationship';
import { User } from '../../../models/User';
import { EmployeeService } from '../../../services/employee.service';
import { GenderService } from '../../../services/others/gender.service';
import { RelationshipService } from '../../../services/others/relationship.service';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit {

    constructor(
        private employeeService: EmployeeService,
        private genderService: GenderService,
        private relationshipService: RelationshipService,
        private fb: FormBuilder,
        private _snackBar: MatSnackBar
    ) { } 

    designations: Desigation[] = [];
    employeeTypes: EmploymentType[] = [];
    genders: Gender[] = [];
    employeeId: number;
    relationships: Relationship[] = [];
    form: FormGroup;

    otherName = "";
    surname = "";
    nokName = "";

    async ngOnInit() {

        this.form = this.fb.group({
            surname: ['', Validators.required],
            otherName: ['', Validators.required],
            idNumber: ['', Validators.required],
            gender: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            email: ['', Validators.required, Validators.email],
            contact: ['', Validators.required],
            address: ['', Validators.required],
            nokName: ['', Validators.required],
            nokContact: ['', Validators.required],
            nokRelationship: ['', Validators.required],
            employeeType: ['', Validators.required],
            designationId: ['', Validators.required],
            startDate: ['', Validators.required]
        });


        this.designations = await this.employeeService.getDesignations();
        this.employeeTypes = await this.employeeService.getEmploymentTypes();
        this.genders = await this.genderService.getGenders();
        this.employeeId = await this.employeeService.getNewEmployeeId();
        this.relationships = await this.relationshipService.getRelationships();

    }

    async onSubmit() {
        if (this.form.valid) {
            const formData = this.form.value;
            const newEmployee: Employee = {
                surname: formData.surname,
                otherName: formData.otherName,
                contact: Number(formData.contact),
                address: formData.address,
                gender: formData.gender,
                designationId: formData.designationId,
                addedBy: formData.addedBy,
                dateAdded: formData.dateAdded,
                email: formData.email,
                employmentStatus: 1,
                startDate: formData.startDate,
                dateOfBirth: formData.dateOfBirth,
                nokName: formData.nokName,
                nokContact: Number(formData.nokContact),
                nokRelationship: formData.nokRelationship,
                idNumber: Number(formData.idNumber),
                employmentType: formData.employmentType
            }

            const userData: User = {
                Id: 'sdf5465sf4d165465ds',
                UserName: 'test'
            }

            const data: EmployeeData = {
                employeeData: newEmployee,
                userData: userData
            }

            const res = await this.employeeService.addEmployee(data);

            if (res) {
                this._snackBar.open('New employee successfully added.', 'Ok', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    duration: 5 * 1000,
                });
                this.form.reset();
            } else {
                this._snackBar.open('Error adding.', 'Ok', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    duration: 5 * 1000,
                });
            }
        }
    }
}
