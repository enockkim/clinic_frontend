import { User } from '../models/User';

export interface Employee {
  employeeId?: number,
  surname: string,
  otherName: string,
  contact: number,
  address: string,
  gender: number,
  designationId: number,
  addedBy: string,
  dateAdded: Date,
  email: string,
  employmentStatus: number,
  startDate: Date,
  dateOfBirth: Date,
  nokName: string,
  nokContact: number,
  nokRelationship: number,
  idNumber: number
}


export interface EmployeeData {
  employeeData: Employee;
  userData: User;
}