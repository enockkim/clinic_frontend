import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Desigation, Employee, EmployeeData, EmploymentType } from '../models/Employee';

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

  private apiUrl = 'https://localhost:44320/Employee';

  constructor(private http: HttpClient) { }

  async getEmployees(): Promise<Employee[]>{
    const url = `${this.apiUrl}/GetEmployees`;
    return await this.http.get<Employee[]>(url).toPromise();
  }
    async getNewEmployeeId(): Promise<number> {
        const url = `${this.apiUrl}/GetNewEmployeeId`;
        return await this.http.get<number>(url).toPromise();
    }

    async getDesignations(): Promise<Desigation[]> {
        const url = `${this.apiUrl}/GetDesignations`;
        return await this.http.get<Desigation[]>(url).toPromise();
    }

    async getEmploymentTypes(): Promise<EmploymentType[]> {
        const url = `${this.apiUrl}/GetEmplyomentTypes`;
        return await this.http.get<EmploymentType[]>(url).toPromise();
    }
  // deleteProject(Project: Project): Observable<Project> {
  //   const url = `${this.apiUrl}/${Project.pId}`;
  //   return this.http.delete<Project>(url);
  // }

  // updateProjectReminder(Project: Project): Observable<Project> {    
  //   const url = `${this.apiUrl}/${Project.pId}`;
  //   return this.http.put<Project>(url, Project, httpOptions);
  // }

    async addEmployee(Employee: EmployeeData): Promise<boolean> {
    const url = `${this.apiUrl}/AddEmployee`;
        return await this.http.post<boolean>(url, Employee, httpOptions).toPromise();
    }

    async updateEmployee(Employee: EmployeeData): Promise<boolean> {
    const url = `${this.apiUrl}/UpdateEmployee`;
        return await this.http.post<boolean>(url, Employee, httpOptions).toPromise();
  }
}
