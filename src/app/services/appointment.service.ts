import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Appointment, AppointmentData, AppointmentTypes } from '../models/Appointment';

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

  private apiUrl = 'https://www.prema.lol/Appointment'; //private apiUrl = 'https://www.prema.lol/Appointment';

  constructor(private http: HttpClient) { }

  async getAppointments(appointmentType: number, appointmentStatus: number): Promise<AppointmentData[]>{
    const url = `${this.apiUrl}/GetAppointments?appointmentType=${appointmentType}&appointmentStatus=${appointmentStatus}`;
    return await this.http.get<AppointmentData[]>(url).toPromise();
  }

    async getAppointmentTypes(): Promise<AppointmentTypes[]> {
        const url = `${this.apiUrl}/GetAppointmentTypes`;
        return await this.http.get<AppointmentTypes[]>(url).toPromise();
    }


  async transferPatient(AppointmentData: AppointmentData): Promise<number> {
    const url = `${this.apiUrl}/TransferPatient`;
    const response = await this.http.post<number>(url, AppointmentData, httpOptions).toPromise();
    return response;
  }

  async editAppointment(AppointmentData: Appointment): Promise<boolean> {
    const url = `${this.apiUrl}/EditAppointment`;
    const response = await this.http.post<boolean>(url, AppointmentData, httpOptions).toPromise();
    return response;
  }


    async addAppointment(AppointmentData: Appointment): Promise<boolean> {
        const url = `${this.apiUrl}/AddAppointment`;
        const response = await this.http.post<boolean>(url, AppointmentData, httpOptions).toPromise();
        return response;
    }

  async tranferAppointment(AppointmentData: AppointmentData): Promise<boolean>{
    const url = `${this.apiUrl}/TransferAppointment`;
    const response = await this.http.post<boolean>(url, AppointmentData, httpOptions).toPromise();
    return response;
    }


    async clearPatient(appointmentId: number): Promise<boolean> {
        const url = `${this.apiUrl}/ClearPatient?appointmentId=${appointmentId}`;
        const response = await this.http.post<boolean>(url, httpOptions).toPromise();
        return response;
    }
}
