import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Desigation, Employee, EmployeeData, EmploymentType } from '../../../models/Employee';
import { Gender } from '../../../models/Gender';
import { Relationship } from '../../../models/Relationship';
import { User } from '../../../models/User';
import { EmployeeService } from '../../../services/employee.service';
import { GenderService } from '../../../services/others/gender.service';
import { RelationshipService } from '../../../services/others/relationship.service';

@Component({
  selector: 'app-edit-employee-modal',
  templateUrl: './edit-employee-modal.component.html',
  styleUrls: ['./edit-employee-modal.component.scss']
})
export class EditEmployeeModalComponent implements OnInit {

    constructor(
        private fb: FormBuilder,
        private employeeService: EmployeeService,
        private genderService: GenderService,
        private relationshipService: RelationshipService,
        @Inject(MAT_DIALOG_DATA) public data: { employeeData: Employee },
        dialog: MatDialog,
        public dialogRef: MatDialogRef<EditEmployeeModalComponent>,
        private _snackBar: MatSnackBar
    ) { }

    designations: Desigation[] = [];
    employeeTypes: EmploymentType[] = [];
    genders: Gender[] = [];
    employeeId: number = this.data.employeeData.employeeId;
    relationships: Relationship[] = [];
    form: FormGroup;

    async ngOnInit() {
        this.form = this.fb.group({
            surname: [this.data.employeeData.surname, Validators.required],
            otherName: [this.data.employeeData.otherName, Validators.required],
            idNumber: [this.data.employeeData.idNumber, Validators.required],
            gender: [this.data.employeeData.gender, Validators.required],
            dateOfBirth: [this.data.employeeData.dateOfBirth, Validators.required],
            email: [this.data.employeeData.email, Validators.required],
            contact: [this.data.employeeData.contact, Validators.required],
            address: [this.data.employeeData.address, Validators.required],
            nokName: [this.data.employeeData.nokName, Validators.required],
            nokContact: [this.data.employeeData.nokContact, Validators.required],
            nokRelationship: [this.data.employeeData.nokRelationship, Validators.required],
            employmentType: [this.data.employeeData.employmentType, Validators.required],
            designationId: [this.data.employeeData.designationId, Validators.required],
            startDate: [this.data.employeeData.startDate, Validators.required]
        });


        this.designations = await this.employeeService.getDesignations();
        this.employeeTypes = await this.employeeService.getEmploymentTypes();
        this.genders = await this.genderService.getGenders();
        this.relationships = await this.relationshipService.getRelationships();

    }

    async onSubmit() {
        if (this.form.valid) {
            const formData = this.form.value;
            const newEmployee: Employee = {
                employeeId: this.employeeId,
                surname: formData.surname,
                otherName: formData.otherName,
                contact: Number(formData.contact),
                address: formData.address,
                gender: formData.gender,
                designationId: formData.designationId,
                addedBy: this.data.employeeData.addedBy,
                dateAdded: this.data.employeeData.dateAdded,
                email: formData.email,
                employmentStatus: this.data.employeeData.employmentStatus,
                startDate: this.data.employeeData.startDate,
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

            const res = await this.employeeService.updateEmployee(data);

            if (res) {
                this._snackBar.open('Employee cahnges saved successfully.', 'Ok', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    duration: 5 * 1000,
                });
                //TODO update data source with changes
            } else {
                this._snackBar.open('Error saving changes.', 'Ok', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    duration: 5 * 1000,
                });
            }
        }
    }

}
