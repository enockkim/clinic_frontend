import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Patient, PatientData } from '../models/Patient';

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
export class ProjectsService {

  // private apiUrl = 'https://localhost:44320/Projects';
  private apiUrl = 'https://localhost:44320/Patient';

  constructor(private http: HttpClient) { }

  async getPatients(): Promise<Patient[]>{
    const url = `${this.apiUrl}/GetPatients`;
    return await this.http.get<Patient[]>(url).toPromise();
  }

  // deleteProject(Project: Project): Observable<Project> {
  //   const url = `${this.apiUrl}/${Project.pId}`;
  //   return this.http.delete<Project>(url);
  // }

  // updateProjectReminder(Project: Project): Observable<Project> {    
  //   const url = `${this.apiUrl}/${Project.pId}`;
  //   return this.http.put<Project>(url, Project, httpOptions);
  // }

  async addPatient(Patient: PatientData): Promise<PatientData> {
    const url = `${this.apiUrl}/AddPatient`;
    return await this.http.post<PatientData>(url, Patient, httpOptions).toPromise();
  }


    async updatePatient(Patient: PatientData): Promise<PatientData> {
        const url = `${this.apiUrl}/UpdatePatient`;
        return await this.http.post<PatientData>(url, Patient, httpOptions).toPromise();
    }
}
