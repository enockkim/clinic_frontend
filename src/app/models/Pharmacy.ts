export interface Prescription {
  prescriptionId: number;
  appointmentId: number;
  itemId: number;
  dosageNumber: number;
  remarks: string;
  status: number;
  availability: number;
}