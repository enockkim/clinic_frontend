import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Gender } from '../../models/Gender';
import { environment } from './../../../environments/environment';

const httpOptions1 = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    // 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private apiUrl = environment.baseUrl + 'Gender';

  constructor(private http: HttpClient) { }

  async getGenders(): Promise<Gender[]>{
    const url = `${this.apiUrl}`;
    return await this.http.get<Gender[]>(url).toPromise();
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
