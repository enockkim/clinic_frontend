export interface Appointment {
  appointmentId?: number,
  patientId: number,
  employeeId: number,
  dateOfAppointment: Date,
  remarks: string,
  appointmentStatus: number,
  paymentMethod: number,
  appointmentType: number,
  dateOfCreation: Date,
  createdBy: string,
  patientType: number,
  previousFacility: number,
}

export interface AppointmentData{
  appointmentId: number,
  patientId: number,
  patientName: string,
  employeeId: number,
  employeeName: string,
  dateOfAppointment: Date,
  remarks: string,
  appointmentStatus: number,
  facilityName: string,
  paymentMethod: number,
  paymentMethodName: string,
  appointmentType: number,
  appointmentTypeName: string,
  dateOfCreation: Date,
  createdBy: string,
  patientType: number,
  patientTypeName: string,
  previousFacility: number,
  previousFacilityName: string
}

export interface AppointmentTypes {
    typeId: number,
    type: string,
    patientType: number
}