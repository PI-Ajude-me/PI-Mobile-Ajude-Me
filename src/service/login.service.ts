import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";


@Injectable()
export class LoginService{

    constructor(private httpClient: HttpClient){ }
    
    login(usuario: string, senha:string): Observable<any>{
        return this.httpClient.post(`${environment.url}/login`, {'login': usuario, 'senha': senha});
    }
}