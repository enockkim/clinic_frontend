import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EditPatientModalComponent} from '../edit-patient-modal/edit-patient-modal.component';
import { ProjectsService } from '../../../services/patient-service.service';
import { Patient, PatientData } from '../../../models/Patient';
import { MatTableDataSource } from '@angular/material/table';

// export interface PeriodicElement {
//   name: string;
//   pid: number;
//   gender: string;
//   national_id: number;
//   age: number;
// }

// const ELEMENT_DATA: PeriodicElement[] = [];


@Component({
  selector: 'app-view-patients',
  templateUrl: './view-patients.component.html',
  styleUrls: ['./view-patients.component.scss']
})

export class ViewPatientsComponent implements OnInit {

  //constructor() {}

  constructor(public dialog: MatDialog, private ProjectsService: ProjectsService) {}

    openDialog(enterAnimationDuration: string, exitAnimationDuration: string, patientData: Patient): void {
        console.log("view",patientData.patientId);
      this.dialog.open(EditPatientModalComponent, {
          data: { patientData: patientData },
         width: "100%",
         height: "80%"
    });
  }

  
  displayedColumns: string[] = ['patientId', 'nationalIdNumber', 'otherName', 'gender', 'county'];
  clickedRows = new Set<Patient>();
  
  dataSource = new MatTableDataSource<Patient>();

  async ngOnInit() {

    const patientResult = await this.ProjectsService.getPatients();
    console.log("patients"+patientResult.length);
    this.dataSource.data = patientResult;

  }

}


