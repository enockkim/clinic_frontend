import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Appointment, AppointmentData } from 'app/models/Appointment';
import { LaboratoryRequest } from 'app/models/Laboratory';
import { LaboratoryService } from '../../../services/facilities/laboratory.service';
import { AppointmentService } from '../../../services/appointment.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Facility } from 'app/models/Facility';
import { FacilityService } from '../../../services/facility.service';
import { TriageService } from 'app/services/facilities/triage.service';
import { OperationService } from 'app/services/facilities/operation.service';
import { DiagnositcImagingService } from 'app/services/facilities/diagnostic-imaging.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'], 
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RequestsComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

  constructor(    
    private AppointmentService: AppointmentService,
    private LaboratoryService: LaboratoryService,
    private triageService: TriageService,
    private operationService: OperationService,
    private diagnositcImagingService: DiagnositcImagingService,
    private FacilityService: FacilityService,
    private fb: FormBuilder,
  ) { }

  @Input() facilityForm: string;

  form: FormGroup;
  // patientData = {} as PatientData;
  tableTitle: string;
  title: string;
  patientName: string = "Enock Sang";
  button: string = "Transfer";
  facility: number;

  billTotal: number;
  cashType;

  facilitiesResult: Facility[];
  finishedLabs: number[];
  finishedImaging: number[];
    finishedOperation: number[];
    finishedTriage: number[];
  prefferedFacilty: number;

  FormData;

  DataSource: MatTableDataSource<AppointmentData>;
  DetailDataSource;
  // DetailDataSource: MatTableDataSource<LaboratoryRequest>;

  Data: AppointmentData[];
  DetailData;
  
  DataColumnsToDisplay: string[] = ['appointmentId', 'patientName'];
  DetailsColumnsToDisplay: string[];  

  columnsToDisplayWithExpand = [...this.DataColumnsToDisplay, 'expand'];

  expandedElement: AppointmentData | null;
  billNo: number;

  async ngOnInit() {    
    // this.form = this.fb.group({
    //   labResult: ['', Validators.required],
    //   labTechRemarks: ['', Validators.required],
    //   facility: [this.prefferedFacilty, Validators.required],
    // });

    switch(this.facilityForm){
      case 'lab':  
        this.form = this.fb.group({
          labResult: ['', Validators.required],
          labTechRemarks: ['', Validators.required],
          facility: [this.prefferedFacilty, Validators.required],
        });
        this.FormData = {
          labId: null,
          labTypeId: null,
          appointmentId: null,
          labResults: null,
          date:  null,
          doctorRemarks:  null,
          labTechRemarks:  null,
          status:  null
        };
        this.tableTitle = 'Laboratory';
        this.title = "Laboratory Result";
        this.Data = await this.AppointmentService.getAppointments(1,3);
        break;
      case 'diagnosticImaging':
        this.form = this.fb.group({
          imagingResult: ['', Validators.required],
          labTechRemarks: ['', Validators.required],
          facility: ['', Validators.required],
        });
        this.FormData = {
          imagingRequestId: null,
          appointmentId: null,
          datetimeOfRequest: null,
          doctorRemarks: null,
          imagingSubType: null,
          result: null,
          status: null,
          technicianRemarks: null,
        };
        this.tableTitle = 'Diagnostic Imaging';
        this.Data = await this.AppointmentService.getAppointments(1,4);
        break;
      case 'operations':
        this.form = this.fb.group({
          operatorRemarks: ['', Validators.required],
          facility: ['', Validators.required],
        });
        this.FormData = {
          operationRequestId: null,
          operationSubType: null,
          appointmentId: null,
          datetimeOfRequest: null,
          doctorRemarks: null,
          status: null,
          operatorRemarks: null
        };
        this.tableTitle = 'Operations';
        this.Data = await this.AppointmentService.getAppointments(1,5);
        break;
      case 'triage':
            this.form = this.fb.group({
            temperature: ['', Validators.required],
            pressure: ['', Validators.required],
            respirationRate: ['', Validators.required],
            weight: ['', Validators.required],
            height: ['', Validators.required],
            pulseRate: ['', Validators.required],
            facility: ['', Validators.required]
        });
            this.FormData = {
                vRecordId: null,
                timeTaken: new Date,
                temperature: null,
                pressure: null,
                pulseRate: null,
                respirationRate: null,
                weight: null,
                height: null,
                appointmentId: null,
                status: null
                }
            this.tableTitle = 'Triage';
        this.Data = await this.AppointmentService.getAppointments(3,10);
        break;
    }


      this.Data.sort((a, b) => (a.appointmentId > b.appointmentId ? -1 : 1));

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

  async transferDiagnosticImaging(){
    if(this.form.valid){
      const formData = this.form.value;
      this.FormData.result = formData.imagingResult;
      this.FormData.labTechRemarks = formData.labTechRemarks;
      this.FormData.status = formData.facility; //misusing property need to implement properly
      
      if(await this.diagnositcImagingService.transferDiagnosticImagingRequest(this.FormData)){
        this.finishedImaging.push(this.FormData.labId);
        this.DetailDataSource = new MatTableDataSource(this.DetailData.filter(diagImg => this.finishedImaging.includes(diagImg.imagingRequestId) == false && diagImg.status == 0));
      }else{
        //error transferring
      }
    }
  }

  async transferOperation(){
    if(this.form.valid){
      const formData = this.form.value;
      this.FormData.operatorRemarks = formData.operatorRemarks;
      this.FormData.status = formData.facility; //misusing property need to implement properly
      
      if(await this.operationService.transferOperationRequest(this.FormData)){
        this.finishedOperation.push(this.FormData.labId);
        this.DetailDataSource = new MatTableDataSource(this.DetailData.filter(operation => this.finishedOperation.includes(operation.operationRequestId) == false && operation.status == 0));
      }else{
        //error transferring
      }
    }
    }

    async transferFromTriage() {
        console.log("transferFromTriage: ", this.FormData.vRecordId);
        if (this.form.valid) {
            const formData = this.form.value;
            this.FormData.temperature = formData.temperature;
            this.FormData.pressure = formData.pressure; 
            this.FormData.pulseRate = formData.pulseRate;
            this.FormData.respirationRate = formData.respirationRate;
            this.FormData.weight = formData.weight;
            this.FormData.height = formData.height;
            this.FormData.status = formData.facility;  //misusing property need to implement properly
            if (await this.triageService.transferFromTriage(this.FormData)) {
                this.finishedTriage.push(this.FormData.vRecordId);
                this.DetailDataSource = new MatTableDataSource(this.DetailData.filter(vital => this.finishedTriage.includes(vital.vRecordId) == false && vital.status == 0));
            } else {
                //error transferring
            }
        }
    }

  async toggleRow(appointmentData: AppointmentData){
    //expand  row
    this.finishedLabs = null;
    this.finishedImaging = null;
      this.finishedOperation = null;
      this.finishedTriage = null;
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

    switch(this.facilityForm){
      case 'lab':
            this.DetailData = await this.LaboratoryService.getLaboratoryRequestsByAppointmentId(appointmentData.appointmentId);
        this.DetailDataSource = new MatTableDataSource(this.DetailData.filter(labDetail => labDetail.status == 0));
        this.DetailsColumnsToDisplay = ['labId', 'facility', 'labResults', 'labTechRemarks', 'actions'];
        break;
      case 'diagnosticImaging':
            this.DetailData = await this.diagnositcImagingService.getDiagnosticImagingRequestsByAppointmentId(appointmentData.appointmentId);
            console.log("diagnosticImaging loaded");
        this.DetailDataSource = new MatTableDataSource(this.DetailData.filter(diagnosticImaging => diagnosticImaging.status == 0));
        this.DetailsColumnsToDisplay = ['imagingRequestId', 'imagingSubType', 'result', 'doctorRemarks', 'technicianRemarks', 'actions'];
        break;
      case 'operations':
            this.DetailData = await this.operationService.getOperationRequestsByAppointmentId(appointmentData.appointmentId);
        this.DetailDataSource = new MatTableDataSource(this.DetailData.filter(operation => operation.status == 0));
        this.DetailsColumnsToDisplay = ['operationRequestId', 'operationSubType', 'doctorRemarks', 'operatorRemarks', 'actions'];
        break;
      case 'triage':
            this.DetailData = await this.triageService.getVitalsByAppointmentId(appointmentData.appointmentId);
        this.DetailDataSource = new MatTableDataSource(this.DetailData.filter(triage => triage.status == 0));
            this.DetailsColumnsToDisplay = ['vRecordId', 'temperature', 'pressure', 'pulseRate', 'respirationRate', 'weight', 'height', 'actions'];
        break;
    }

    // this.DetailData = await this.LaboratoryService.getLaboratoryRequestsByAppointmentId(appointmentData.appointmentId);
    // this.DetailDataSource = new MatTableDataSource(this.DetailData.filter(labDetail => labDetail.status == 0));
    this.expandedElement = appointmentData;
  }
  loadForm(labDetail: LaboratoryRequest): void{
    //fill form
    this.facility = this.expandedElement.previousFacility;
    this.FormData = labDetail;
    this.billTotal = 100;
  }
    ngAfterViewInit() {
        this.DataSource.paginator = this.paginator;
        this.DataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.DataSource.filter = filterValue.trim().toLowerCase();

        if (this.DataSource.paginator) {
            this.DataSource.paginator.firstPage();
        }
    }

}
