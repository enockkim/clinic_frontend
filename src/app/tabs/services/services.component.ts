import { Component, OnInit, Input } from '@angular/core';
import { Vital } from '../../models/Vital';
import { TriageService } from '../../services/facilities/triage.service';
import { LaboratoryService } from '../../services/facilities/laboratory.service';
import { DiagnositcImagingService } from '../../services/facilities/diagnostic-imaging.service';
import { OperationService } from '../../services/facilities/operation.service';
import { PharmacyService } from '../../services/facilities/pharmacy.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Prescription } from 'app/models/Pharmacy';
import { LaboratoryRequest } from 'app/models/Laboratory';
import { DiagnosticImagingRequest } from 'app/models/DiagnosticImaging';
import { OperationRequest } from 'app/models/Operation';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  @Input() data: number[];

  columnsToDisplay: string[];
  dataSource;
  @Input() vitalsDataSource: Vital[];
  @Input() labDataSource: LaboratoryRequest[];
  @Input() diagnosticImagingDataSource: DiagnosticImagingRequest[];
  @Input() operationDataSource: OperationRequest[];
  @Input() prescriptionDataSource: Prescription[];

  constructor(
    private TriageService: TriageService,
    private LaboratoryService: LaboratoryService,
    private DiagnositcImagingService: DiagnositcImagingService,
    private OperationService: OperationService,
    private PharmacyService: PharmacyService,
  ) { }

  async ngOnInit() {
    this.getData(this.data[1], this.data[0]);
  }

  async getData(serviceType: number, appointmentId: number){
    // console.log("servicetype"+serviceType);
    switch (serviceType) {
      case 1:
        this.vitalsDataSource = await this.TriageService.getVitalsByAppointmentId(appointmentId);
        this.dataSource = new MatTableDataSource(this.vitalsDataSource);
        this.columnsToDisplay = ['timeTaken', 'temperature', 'pressure', 'pulseRate', 'respirationRate', 'weight', 'height']
        break;
      case 2:
        this.labDataSource = await this.LaboratoryService.getLaboratoryRequestsByAppointmentId(appointmentId);
        this.dataSource = new MatTableDataSource(this.labDataSource);
        this.columnsToDisplay = ['labId', 'labTypeId', 'labResults', 'date', 'doctorRemarks', 'labTechRemarks']
        break;
      case 3:
        this.diagnosticImagingDataSource = await this.DiagnositcImagingService.getDiagnosticImagingRequestsByAppointmentId(appointmentId);
        this.dataSource = new MatTableDataSource(this.diagnosticImagingDataSource);
        this.columnsToDisplay = ['imagingRequestId', 'datetimeOfRequest', 'doctorRemarks', 'imagingSubType', 'result', 'technicianRemarks']
        break;
      case 4:
        this.operationDataSource = await this.OperationService.getOperationRequestsByAppointmentId(appointmentId);
        this.dataSource = new MatTableDataSource(this.operationDataSource);
        this.columnsToDisplay = ['operationRequestId', 'operationSubType', 'datetimeOfRequest', 'doctorRemarks', 'operatorRemarks']
        break;
      case 5:
        this.prescriptionDataSource = await this.PharmacyService.getPrescriptionsByAppointmentId(appointmentId);
        this.dataSource = new MatTableDataSource(this.prescriptionDataSource);
        this.columnsToDisplay = ['itemId', 'dosageNumber', 'pressure', 'remarks', 'availability']
        break;
      default:
        break;
    }
  }

}
