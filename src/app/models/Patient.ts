import { User } from '../models/User';

export interface Patient {
    patientId?: number;
    surname: string;
    otherName: string;
    gender: number;
    contact: number;
    dob: string;
    nokName: string;
    nokContact: number;
    nokRelationship: number;
    nationalIdNumber: string;
    county: number;
    subcounty: number;
    ward: number;
    status: number;
  }


export interface PatientData {
  patientData: Patient;
  userData: User;
}