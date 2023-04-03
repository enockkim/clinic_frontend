import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { EditEmployeeModalComponent } from '../edit-employee-modal/edit-employee-modal.component';
import { EmployeeService } from '../../../services/employee.service';
import { Patient } from '../../../models/Patient';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Employee, EmployeeData } from 'app/models/Employee';

// export interface PeriodicElement {
//   name: string;
//   pid: number;
//   gender: string;
//   national_id: number;
//   age: number;
// }

// const ELEMENT_DATA: PeriodicElement[] = [];


@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.scss']
})

export class ViewEmployeesComponent implements OnInit {

  //constructor() {}

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private EmployeeService: EmployeeService) {}

    openDialog(enterAnimationDuration: string, exitAnimationDuration: string, employeeData: Employee): void {
        this.dialog.open(EditEmployeeModalComponent, {
            data: { employeeData: employeeData },
      width: "80%",
      height: "80%"
    });
  }

  
  displayedColumns: string[] = ['eid', 'national_id', 'name', 'designation'];
  clickedRows = new Set<Employee>();
  
  dataSource = new MatTableDataSource<Employee>();

  async ngOnInit() {

      const employeeResult = await this.EmployeeService.getEmployees();
      employeeResult.sort((a, b) => (a.employeeId > b.employeeId ? -1 : 1));
    console.log("employees"+employeeResult.length);
    this.dataSource.data = employeeResult.sort();

  }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

}


