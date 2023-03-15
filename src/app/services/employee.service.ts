import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Employee, EmployeeData } from '../models/Employee';

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


export class EmployeeService {

  private apiUrl = 'http://localhost:5000/Employee';

  constructor(private http: HttpClient) { }

  async getEmployees(): Promise<Employee[]>{
    const url = `${this.apiUrl}/GetEmployees`;
    return await this.http.get<Employee[]>(url).toPromise();
  }

  // deleteProject(Project: Project): Observable<Project> {
  //   const url = `${this.apiUrl}/${Project.pId}`;
  //   return this.http.delete<Project>(url);
  // }

  // updateProjectReminder(Project: Project): Observable<Project> {    
  //   const url = `${this.apiUrl}/${Project.pId}`;
  //   return this.http.put<Project>(url, Project, httpOptions);
  // }

  async addPatient(Employee: EmployeeData): Promise<EmployeeData> {
    const url = `${this.apiUrl}/AddEmployee`;
    return await this.http.post<EmployeeData>(url, Employee, httpOptions).toPromise();
  }
}
