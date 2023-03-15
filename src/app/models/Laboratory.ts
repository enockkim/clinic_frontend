export interface LaboratoryRequest {
  labId?: number;
  labTypeId: number;
  appointmentId: number;
  labResults?: string;
  date?: Date;
  doctorRemarks?: string;
  labTechRemarks?: string;
  status: number;
}

export interface LaboratoryTypes {
  labTypeID: number;
  labTypeName: string;
  cost: number;
}