import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InvetoryCategory } from '../../../../models/Pharmacy';
import { PharmacyService } from '../../../../services/facilities/pharmacy.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<AddCategoryComponent>,
        private pharmacyService: PharmacyService,
        private _snackBar: MatSnackBar,
    ) { }

    form: FormGroup;
    // patientData = {} as PatientData;
    title: string = "Add Category";
    description: string = "Enter the name of the new category.";
    button: string = "Add";


    ngOnInit(): void {
        this.form = this.fb.group({
            categoryName: ['', Validators.required]
            })
    }

    async onSubmit() {
        if (this.form.valid) {
            const formData = this.form.value;
            const categoryName = formData.categoryName;
            let newCatgory: InvetoryCategory = {
                categoryName: categoryName,
                categoryId: null
            }

            const addedCategory = await this.pharmacyService.addInventoryCategory(newCatgory);

 

            if (addedCategory) {
                this._snackBar.open('New category added sucessfully.', 'Ok', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    duration: 5 * 1000,
                });
                this.dialogRef.close(addedCategory);
            } else {
                this._snackBar.open('Error adding category.', 'Ok', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    duration: 5 * 1000,
                });
            }

        }
    }


}
