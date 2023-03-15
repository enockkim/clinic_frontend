export interface DiagnosticImagingRequest {
  imagingRequestId?: number;
  appointmentId?: number;
  datetimeOfRequest?: number;
  doctorRemarks?: number;
  imagingSubType?: number;
  result?: number;
  status: number;
  technicianRemarks?: number;
}

export interface DiagnositcImagingType{
  imagingType: string;
  imagingTypeId: number;
}

export interface DiagnositcImagingSubtype{
  imagingSubTypeId: number;
  imagingSubType: string;
  imagingTypeId: number;
  cost: number;
}

export interface ImagingType{
  imagingTypeId: number;
  imagingType: string;
  subtypes: DiagnositcImagingSubtype[];
}