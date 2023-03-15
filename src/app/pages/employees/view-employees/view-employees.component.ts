import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { EditEmployeeModalComponent } from '../edit-employee-modal/edit-employee-modal.component';
import { EmployeeService } from '../../../services/employee.service';
import { Patient } from '../../../models/Patient';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'app/models/Employee';

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

  constructor(public dialog: MatDialog, private EmployeeService: EmployeeService) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EditEmployeeModalComponent, {
      width: "100%",
      height: ""
    });
  }

  
  displayedColumns: string[] = ['eid', 'national_id', 'name', 'designation'];
  clickedRows = new Set<Employee>();
  
  dataSource = new MatTableDataSource<Employee>();

  async ngOnInit() {

    const employeeResult = await this.EmployeeService.getEmployees();
    console.log("employees"+employeeResult.length);
    this.dataSource.data = employeeResult;

  }

}


