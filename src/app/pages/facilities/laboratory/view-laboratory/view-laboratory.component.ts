import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Appointment, AppointmentData } from 'app/models/Appointment';
import { LaboratoryRequest } from 'app/models/Laboratory';
import { LaboratoryService } from '../../../../services/facilities/laboratory.service';
import { AppointmentService } from '../../../../services/appointment.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Facility } from 'app/models/Facility';
import { FacilityService } from '../../../../services/facility.service';

@Component({
  selector: 'app-view-laboratory',
  templateUrl: './view-laboratory.component.html',
  styleUrls: ['./view-laboratory.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ViewLaboratoryComponent implements OnInit {

  constructor(    
    private LaboratoryService: LaboratoryService,
    private AppointmentService: AppointmentService,
    private FacilityService: FacilityService,
    private fb: FormBuilder
  ) { }

  form: FormGroup;
  // patientData = {} as PatientData;
  tableTitle: string = "Laboratory"
  title: string = "Laboratory Result";
  patientName: string = "Enock Sang";
  button: string = "Transfer";
  facility: number;

  billTotal: number;
  cashType;
  Data: AppointmentData[];
  DataSource: MatTableDataSource<AppointmentData>;
  DetailData: LaboratoryRequest[];
  facilitiesResult: Facility[];
  finishedLabs: number[];
  prefferedFacilty: number;
  FormData:  LaboratoryRequest = {
    labId: null,
    labTypeId: null,
    appointmentId: null,
    labResults: null,
    date:  null,
    doctorRemarks:  null,
    labTechRemarks:  null,
    status:  null
  };
  DetailDataSource: MatTableDataSource<LaboratoryRequest>;

  DataColumnsToDisplay: string[] = ['appointmentId', 'patientName'];
  DetailsColumnsToDisplay: string[] = ['labId', 'facility', 'labResults', 'labTechRemarks', 'actions'];  
  columnsToDisplayWithExpand = [...this.DataColumnsToDisplay, 'expand'];

  expandedElement: AppointmentData | null;
  billNo: number;

  async ngOnInit() {    
    this.form = this.fb.group({
      labResult: ['', Validators.required],
      labTechRemarks: ['', Validators.required],
      facility: [this.prefferedFacilty, Validators.required],
    });

    this.Data = await this.AppointmentService.getAppointments(1,3);
    this.DataSource = new MatTableDataSource(this.Data);    
    this.facilitiesResult = await this.FacilityService.getFacilities();
  }

  async transferLab(){
    if(this.form.valid){
      const formData = this.form.value;
      this.FormData.labResults = formData.labResult;
      this.FormData.labTechRemarks = formData.labTechRemarks;
      this.FormData.status = formData.facility; //misusing property need to implement properly
      
      if(await this.LaboratoryService.transferLab(this.FormData)){
        this.finishedLabs.push(this.FormData.labId);
        this.DetailDataSource = new MatTableDataSource(this.DetailData.filter(lab => this.finishedLabs.includes(lab.labId) == false && lab.status == 0));
      }else{
        //error transferring
      }
    }
  }

  async toggleRow(appointmentData: AppointmentData){
    //expand  row
    this.finishedLabs = null;
    switch(appointmentData.appointmentType){
      case 1:
        this.prefferedFacilty = 15;
        break;
      case 2:
      case 3: 
        this.prefferedFacilty = 1;
        break;
      default:
        this.prefferedFacilty = 1;
        break;
    }
    this.DetailData = await this.LaboratoryService.getLaboratoryRequestsByAppointmentId(appointmentData.appointmentId);
    this.DetailDataSource = new MatTableDataSource(this.DetailData.filter(labDetail => labDetail.status == 0));
    this.expandedElement = appointmentData;
  }
  loadForm(labDetail: LaboratoryRequest): void{
    //fill form
    this.facility = this.expandedElement.previousFacility;
    this.FormData = labDetail;
    this.billTotal = 100;
  }

}
