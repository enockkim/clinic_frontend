import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentData } from '../../../models/Appointment';
import { Inventory, InvetoryCategory } from '../../../models/Pharmacy';
import { PharmacyService } from '../../../services/facilities/pharmacy.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddMedicationComponent } from './add-medication/add-medication.component';
import { AddStockComponent } from './add-stock/add-stock.component';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
    styleUrls: ['./medication.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class MedicationComponent implements OnInit {

    constructor(
        private pharmacyService: PharmacyService,
        public dialog: MatDialog, 
    ) { }

    FormData;



    DataSource: MatTableDataSource<InvetoryCategory>;
    DetailDataSource: MatTableDataSource<Inventory>;

    categories: InvetoryCategory[] = [];
    inventory: Inventory[] = [];
    // DetailDataSource: MatTableDataSource<LaboratoryRequest>;

    Data: AppointmentData[];
    DetailData;

    tableTitle: string = "Medication";
    title: string = "Categories";


    DataColumnsToDisplay: string[] = ['categoryId', 'categoryName'];
    DetailsColumnsToDisplay: string[] = ['itemId', 'brandName', 'medication', 'administrationType', 'unit', 'unitCost', 'stock', 'UnitOfMeasure'];

    columnsToDisplayWithExpand = [...this.DataColumnsToDisplay, 'expand'];

    expandedElement: AppointmentData | null;

    async ngOnInit() {
        this.categories = await this.pharmacyService.getInventoryCategory();
        this.DataSource = new MatTableDataSource(this.categories);


        this.inventory = await this.pharmacyService.getInventory();
    }

    async toggleRow(category: InvetoryCategory) {
        this.DetailDataSource = new MatTableDataSource(this.inventory.filter(i => i.category == category.categoryId))
    }

    addCategory() {
        const dial = this.dialog.open(AddCategoryComponent, {
            width: "50%",
            height: "",
        });

        dial.afterClosed()
            .subscribe(addedCategory => {
                if (addedCategory) {
                    this.categories.push(addedCategory);
                    this.DataSource = new MatTableDataSource(this.categories);
                }
            })
    }

    addMedication() {
        const dial = this.dialog.open(AddMedicationComponent, {
            width: "50%",
            height: "",
        });

        dial.afterClosed()
            .subscribe(addedMedication => {
                if (addedMedication) {
                    this.inventory.push(addedMedication);
                    this.DetailDataSource = new MatTableDataSource(this.inventory);
                }
            })
    }

    addStock() {
        const dial = this.dialog.open(AddStockComponent, {
            width: "50%",
            height: "",
        });

        dial.afterClosed()
            .subscribe(addedStock => {
                if (addedStock) {
                    this.inventory = this.inventory.map(obj => {
                        if (obj.itemId === addedStock.itemId) {
                            return { ...obj, stock: addedStock.stock };
                        }
                        return obj;
                    });


                    this.DetailDataSource = new MatTableDataSource(this.inventory.filter(i => i.category == addedStock.category));
                }
            })
    }

}
