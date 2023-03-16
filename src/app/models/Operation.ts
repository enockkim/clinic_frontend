export interface OperationRequest {
  operationRequestId?: number;
  operationSubType?: number;
  appointmentId?: number;
  datetimeOfRequest?: Date;
  doctorRemarks?: string;
  status?: number;
  operatorRemarks?: string;
}

export interface OperationType{
  operationName: string;
  operationTypeId: number;
}

export interface OperationSubtype{
  operationSubTypeId: number;
  operationSubType: string;
  operationTypeId: number;
  cost: number;
}

export interface OpType{
  operationTypeId: number;
  operationName: string;
  subtypes: OperationSubtype[];
}