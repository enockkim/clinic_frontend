import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Prescription, Inventory, InvetoryCategory, AdministrationType, UnitOfMeasure, AddStock } from '../../models/Pharmacy';

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
export class PharmacyService {

  private apiUrl = 'https://www.prema.lol/Pharmacy';

  constructor(private http: HttpClient) { }

  async getPrescriptionsByAppointmentId(appointmentId: number): Promise<Prescription[]>{
    const url = `${this.apiUrl}/GetPrescriptionsByAppointmentId?appointmentId=${appointmentId}`;
    return await this.http.get<Prescription[]>(url).toPromise();
  }
  
  async getInventory(): Promise<Inventory[]>{
    const url = `${this.apiUrl}/GetInventory`;
    return await this.http.get<Inventory[]>(url).toPromise();
  }


    async addInventory(newMedication: Inventory): Promise<Inventory> {
        const url = `${this.apiUrl}/AddMedication`;
        return await this.http.post<Inventory>(url, newMedication).toPromise();
    }

  
  async getInventoryCategory(): Promise<InvetoryCategory[]>{
    const url = `${this.apiUrl}/GetInventoryCategories`;
    return await this.http.get<InvetoryCategory[]>(url).toPromise();
  }

    async addInventoryCategory(newCategory: InvetoryCategory): Promise<InvetoryCategory> {
        const url = `${this.apiUrl}/AddCategory`;
        return await this.http.post<InvetoryCategory>(url, newCategory).toPromise();
    }

  async addToPrescription(prescriptionItem: Prescription): Promise<Prescription>{
    const url = `${this.apiUrl}/AddToPrescription`;
    return await this.http.post<Prescription>(url, prescriptionItem).toPromise();
  }

    async getAdministrationTypes(): Promise<AdministrationType[]> {
        const url = `${this.apiUrl}/GetAdministrationTypes`;
        return await this.http.get<AdministrationType[]>(url).toPromise();
    }

    async getUnitsOfMeasure(): Promise<UnitOfMeasure[]> {
        const url = `${this.apiUrl}/GetUnitsOfMeasure`;
        return await this.http.get<UnitOfMeasure[]>(url).toPromise();
    }

    async addStock(newStock: AddStock): Promise<Inventory> {
        const url = `${this.apiUrl}/AddStock`;
        return await this.http.post<Inventory>(url, newStock).toPromise();
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
