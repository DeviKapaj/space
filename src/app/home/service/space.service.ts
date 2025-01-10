import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";

export class SpaceService {
    private http: HttpClient = inject(HttpClient)

    url = 'http://localhost:8000/api/'

    async GetAllPlanets(){
        const response = await firstValueFrom(this.http.get<any>(this.url))
    }
}