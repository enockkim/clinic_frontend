import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { County, Subcounty, Wards } from '../../models/Location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

    private apiUrl = 'https://localhost:44320/Location';

    constructor(private http: HttpClient) { }

    async getCounties(): Promise<County[]> {
        const url = `${this.apiUrl}/GetCounties`;
        return await this.http.get<County[]>(url).toPromise();
    }

    async getSubCounties(): Promise<Subcounty[]> {
        const url = `${this.apiUrl}/GetSubCounties`;
        return await this.http.get<Subcounty[]>(url).toPromise();
    }

    async getWards(): Promise<Wards[]> {
        const url = `${this.apiUrl}/GetWards`;
        return await this.http.get<Wards[]>(url).toPromise();
    }
}
