import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Patient, PatientData, PatientView } from '../models/Patient';
import { environment } from './../../environments/environment';

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
export class ProjectsService {

  // private apiUrl = 'https://www.prema.lol/Projects';
  private apiUrl = environment.baseUrl + 'Patient';

  constructor(private http: HttpClient) { }

  async getPatients(): Promise<Patient[]>{
    const url = `${this.apiUrl}`;
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

  async addPatient(Patient: Patient): Promise<PatientView> {
    const url = `${this.apiUrl}`;
    return await this.http.post<Patient>(url, Patient, httpOptions).toPromise();
  }


    async updatePatient(Patient: PatientData): Promise<PatientData> {
        const url = `${this.apiUrl}/UpdatePatient`;
        return await this.http.put<PatientData>(url, Patient, httpOptions).toPromise();
    }
}
