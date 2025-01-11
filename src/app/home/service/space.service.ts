import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Agency } from "../model/space.model";

@Injectable({
    providedIn: 'root', // Service is available throughout the application
  })
export class SpaceService {
    private http: HttpClient = inject(HttpClient)

    url = 'http://localhost:8000/api/'

    async GetAllAgencies(): Promise<Agency[]>{
        const response = await firstValueFrom(this.http.get<any>(this.url + 'agencies'));
        return response
    }

    async deleteAgency(id: number){
        const response = await firstValueFrom(this.http.delete<any>(this.url + 'agencies/' + id + '/'))
        return response
    }

    addAgency(agency: Agency){
        return this.http.post<any>(this.url + 'agencies/', agency)
    }
}