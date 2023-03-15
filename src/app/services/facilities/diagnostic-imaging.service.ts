import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DiagnosticImagingRequest, ImagingType, DiagnositcImagingSubtype, DiagnositcImagingType } from '../../models/DiagnosticImaging';

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
export class DiagnositcImagingService {

  private apiUrl = 'http://localhost:5000/DiagnosticImaging';

  constructor(private http: HttpClient) { }

  async getDiagnosticImagingRequestsByAppointmentId(appointmentId: number): Promise<DiagnosticImagingRequest[]>{
    const url = `${this.apiUrl}/GetDiagnosticImagingRequestsByAppointmentId?appointmentId=${appointmentId}`;
    return await this.http.get<DiagnosticImagingRequest[]>(url).toPromise();
  }
  
  async getImagingTypes(): Promise<ImagingType[]>{
    const url = `${this.apiUrl}/GetDiagnosticImagingTypes`;
    return await this.http.get<ImagingType[]>(url).toPromise();
  }

  // deleteProject(Project: Project): Observable<Project> {
  //   const url = `${this.apiUrl}/${Project.pId}`;
  //   return this.http.delete<Project>(url);
  // }

  // updateProjectReminder(Project: Project): Observable<Project> {    
  //   const url = `${this.apiUrl}/${Project.pId}`;
  //   return this.http.put<Project>(url, Project, httpOptions);
  // }

  async createDiagnosticImagingRequest(request: DiagnosticImagingRequest){
    const url = `${this.apiUrl}/CreateImagingRequest`;
    return await this.http.post<DiagnosticImagingRequest>(url, request, httpOptions).toPromise();
  }

  async transferDiagnosticImagingRequest(request: DiagnosticImagingRequest){
    const url = `${this.apiUrl}/TransferDiagImg`;
    return await this.http.post<DiagnosticImagingRequest>(url, request, httpOptions).toPromise();
  }
}
