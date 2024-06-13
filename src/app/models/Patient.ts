import { User } from '../models/User';
import { Gender } from './Gender';
import { NextOfKin } from './NextOfKin';

export interface Patient {
    id?: number;
    surname: string;
    other_names: string;
    contact: number;
    date_of_birth: string;
    national_id_number: string;
    county: number;
    subcounty: number;
    ward: number;
    status: number;
    email: string;
    next_of_kin: NextOfKin;
    fk_gender_id: number;
  }

export interface PatientView {
    id?: number;
    surname: string;
    other_names: string;
    contact: number;
    date_of_birth: string;
    national_id_number: string;
    county: number;
    subcounty: number;
    ward: number;
    status: number;
    email: string;
    next_of_kin: NextOfKin;
    gender: Gender;
  }

export interface PatientData {
  patientData: Patient;
  userData: User;
}