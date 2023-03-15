export interface OperationRequest {
  operationRequestId: number;
  operationSubType?: number;
  appointmentId?: number;
  datetimeOfRequest?: Date;
  doctorRemarks?: string;
  status?: number;
  operatorRemarks?: string;
}

export interface DiagnositcImagingType{
  operationName: string;
  operationTypeId: number;
}

export interface DiagnositcImagingSubtype{
  imagingSubTypeId: number;
  operationTypeId: string;
  imagingTypeId: number;
  cost: number;
}

export interface ImagingType{
  imagingTypeId: number;
  imagingType: string;
  subtypes: DiagnositcImagingSubtype[];
}