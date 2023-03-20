import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { OpType, OperationRequest, OperationType, OperationSubtype } from '../../models/Operation';

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
export class OperationService {

  private apiUrl = 'https://localhost:44320/Operation';

  constructor(private http: HttpClient) { }

  async getOperationRequestsByAppointmentId(appointmentId: number): Promise<OperationRequest[]>{
    const url = `${this.apiUrl}/GetOperationRequestsByAppointmentId?appointmentId=${appointmentId}`;
    return await this.http.get<OperationRequest[]>(url).toPromise();
  }

  async getOperationTypes(): Promise<OpType[]>{
    const url = `${this.apiUrl}/GetOperationTypes`;
    return await this.http.get<OpType[]>(url).toPromise();
  }
  
  async createOperationRequest(request: OperationRequest){
    const url = `${this.apiUrl}/CreateOperationRequest`;
    return await this.http.post<OperationRequest>(url, request, httpOptions).toPromise();
  }

  async transferOperationRequest(request: OperationRequest){
    const url = `${this.apiUrl}/TransferOperationRequest`;
    return await this.http.post<OperationRequest>(url, request, httpOptions).toPromise();
  }
  // async createDiagnosticImagingRequest(request: DiagnosticImagingRequest){
  //   const url = `${this.apiUrl}/CreateImagingRequest`;
  //   return await this.http.post<DiagnosticImagingRequest>(url, request, httpOptions).toPromise();
  // }

  // async transferDiagnosticImagingRequest(request: DiagnosticImagingRequest){
  //   const url = `${this.apiUrl}/TransferDiagImg`;
  //   return await this.http.post<DiagnosticImagingRequest>(url, request, httpOptions).toPromise();
  // }
}
