import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Appointment, AppointmentData } from '../models/Appointment';

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
export class AppointmentService {

  private apiUrl = 'https://localhost:44320/Appointment'; //private apiUrl = 'https://localhost:44320/Appointment';

  constructor(private http: HttpClient) { }

  async getAppointments(appointmentType: number, appointmentStatus: number): Promise<AppointmentData[]>{
    const url = `${this.apiUrl}/GetAppointments?appointmentType=${appointmentType}&appointmentStatus=${appointmentStatus}`;
    return await this.http.get<AppointmentData[]>(url).toPromise();
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

  async transferPatient(AppointmentData: AppointmentData): Promise<boolean> {
    const url = `${this.apiUrl}/TransferPatient`;
    const response = await this.http.post<boolean>(url, AppointmentData, httpOptions).toPromise();
    return response;
  }

  async editAppointment(AppointmentData: AppointmentData): Promise<boolean> {
    const url = `${this.apiUrl}/EditAppointment`;
    const response = await this.http.post<boolean>(url, AppointmentData, httpOptions).toPromise();
    return response;
  }

  async tranferAppointment(AppointmentData: AppointmentData): Promise<boolean>{
    const url = `${this.apiUrl}/TransferAppointment`;
    const response = await this.http.post<boolean>(url, AppointmentData, httpOptions).toPromise();
    return response;
  }
}
