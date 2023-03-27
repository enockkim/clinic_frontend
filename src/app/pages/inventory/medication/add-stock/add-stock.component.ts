import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddStock, Inventory, InvetoryCategory } from '../../../../models/Pharmacy';
import { PharmacyService } from '../../../../services/facilities/pharmacy.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {

    constructor(
        private fb: FormBuilder,
        public pharmacyService: PharmacyService,
        dialog: MatDialog,
        public dialogRef: MatDialogRef<AddStockComponent>
    ) { }

    form: FormGroup;
    typeIndex: number;

    invetoryCategory: InvetoryCategory[] = [];
    inventory: Map<number, Inventory[]> = new Map<number, Inventory[]>(); 

    async ngOnInit() {
        this.form = this.fb.group({
            itemId: ['', Validators.required],
            stock: ['', Validators.required],
            category: ['', Validators.required]
        });

        this.invetoryCategory = await this.pharmacyService.getInventoryCategory();
        const inventoryListRes = await this.pharmacyService.getInventory();
        let inventoryDict = new Map<number, Inventory[]>();
        // const operationTypesTemp: OperationType[] = [];
        this.invetoryCategory.forEach(function (inventoryCategory) {
            let inventoryList: Inventory[] = [];
            inventoryListRes.forEach(function (invetoryItem) {
                if (invetoryItem.category == inventoryCategory.categoryId) {
                    inventoryList.push(invetoryItem);
                    console.log(invetoryItem);
                }
            });

            inventoryDict[inventoryCategory.categoryId] = inventoryList;
        });

        this.inventory = inventoryDict;
        // console.log(this.operationTypes);
        console.log(this.inventory);
    }

    async onSubmit() {

        if (this.form.valid) {
            const formData = this.form.value;
            let addStock: AddStock = {
                itemId: Number(formData.itemId),
                stock: Number(formData.stock)
            }
            const newStock = await this.pharmacyService.addStock(addStock);
            if (newStock) {
                this.dialogRef.close(newStock);
            } else {
                //TODO add error log
            }
        }
    }
  }


