import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Facility } from '../models/Facility';

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
export class FacilityService {

  private apiUrl = 'http://localhost:5000/Facility';

  constructor(private http: HttpClient) { }

  async getFacilities(): Promise<Facility[]>{
    const url = `${this.apiUrl}/GetFacilities`;
    return await this.http.get<Facility[]>(url).toPromise();
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
