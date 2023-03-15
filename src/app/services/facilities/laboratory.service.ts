import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LaboratoryRequest, LaboratoryTypes } from '../../models/Laboratory';

const httpOptions1 = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    // 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class LaboratoryService {

  private apiUrl = 'http://localhost:5000/Laboratory';

  constructor(private http: HttpClient) { }

  async getLaboratoryRequestsByAppointmentId(appointmentId: number): Promise<LaboratoryRequest[]>{
    const url = `${this.apiUrl}/GetLaboratoryRequestsByAppointmentId?appointmentId=${appointmentId}`;
    return await this.http.get<LaboratoryRequest[]>(url).toPromise();
  }

  async createLaboratoryRequest(laboratoryRequest: LaboratoryRequest){
    const url = `${this.apiUrl}/CreateLaboratoryRequest`;
    return await this.http.post<LaboratoryRequest>(url, laboratoryRequest).toPromise();
  }
  
  async getLabTypes(): Promise<LaboratoryTypes[]>{
    const url = `${this.apiUrl}/GetLaboratoryTypes`;
    return await this.http.get<LaboratoryTypes[]>(url).toPromise();
  }

  async transferLab(laboratoryRequest: LaboratoryRequest){
    const url = `${this.apiUrl}/TransferLab`;
    return await this.http.post<LaboratoryRequest>(url, laboratoryRequest).toPromise();
  }
  // deleteProject(Project: Project): Observable<Project> {
  //   const url = `${this.apiUrl}/${Project.pId}`;
  //   return this.http.delete<Project>(url);
  // }

  // updateProjectReminder(Project: Project): Observable<Project> {    
  //   const url = `${this.apiUrl}/${Project.pId}`;
  //   return this.http.put<Project>(url, Project, httpOptions);
  // }

  // async addPatient(Appointment: Appointment): Promise<Appointment> {
  //   const url = `${this.apiUrl}/AddAppointment`;
  //   return await this.http.post<Appointment>(url, Appointment, httpOptions).toPromise();
  // }
}
