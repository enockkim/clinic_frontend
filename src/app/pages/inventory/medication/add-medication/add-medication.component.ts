import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdministrationType, Inventory, InvetoryCategory, UnitOfMeasure } from '../../../../models/Pharmacy';
import { PharmacyService } from '../../../../services/facilities/pharmacy.service';

@Component({
  selector: 'app-add-medication',
  templateUrl: './add-medication.component.html',
  styleUrls: ['./add-medication.component.scss']
})
export class AddMedicationComponent implements OnInit {

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<AddMedicationComponent>,
        private pharmacyService: PharmacyService,
        private _snackBar: MatSnackBar,
    ) { }

    form: FormGroup;

    title: string = "Add Medication";
    description: string = "Fill the form below to add new medication.";
    button: string = "Add";

    categories: InvetoryCategory[] = [];
    administrationTypes: AdministrationType[] = [];
    UnitOfMeasures: UnitOfMeasure[] = [];


    async ngOnInit() {
        this.form = this.fb.group({
            category: ['', Validators.required],
            brandName: ['', Validators.required],
            medication: ['', Validators.required],
            administrationType: ['', Validators.required],
            unit: ['', Validators.required],
            unitCost: ['', Validators.required],
            UnitOfMeasure: ['', Validators.required]
        })

        this.categories = await this.pharmacyService.getInventoryCategory();
        this.administrationTypes = await this.pharmacyService.getAdministrationTypes();
        this.UnitOfMeasures = await this.pharmacyService.getUnitsOfMeasure();

    }

    async onSubmit() {
        if (this.form.valid) {
            const formData = this.form.value;

            let newMedication: Inventory = {
                category: Number(formData.category),
                brandName: formData.brandName,
                medication: formData.medication,
                administrationType: Number(formData.administrationType),
                unit: formData.unit,
                unitCost: Number(formData.unitCost),
                UnitOfMeasure: formData.UnitOfMeasure
            }

            const addedMedication = await this.pharmacyService.addInventory(newMedication);

            if (addedMedication) {
                this._snackBar.open('New medication added sucessfully.', 'Ok', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    duration: 5 * 1000,
                });
                this.dialogRef.close(addedMedication);
            } else {
                this._snackBar.open('Error adding medication.', 'Ok', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    duration: 5 * 1000,
                });
            }

        }
    }
}
