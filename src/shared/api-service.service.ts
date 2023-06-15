import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  baseUrl : string = environment.baseUrl;

  postEventos(data:any){
    return this.http.post<any>(this.baseUrl+'/eventos', data);
  }

  getAllEventos(){
    return this.http.get<any>(this.baseUrl+'/eventos');
  }

  deleteEventos(id:any){
    return this.http.delete<any>(this.baseUrl+'/eventos/'+ id);
  }

  updateEventos(data:any, id:number){
    return this.http.put<any>(this.baseUrl+'/eventos/'+ id, data);
  }
  
  postAdmin(data:any){
    return this.http.post<any>(this.baseUrl+'/admin', data);
  }

  getAllAdmin(){
    return this.http.get<any>(this.baseUrl+'/admin');
  }

  deleteAdmin(id:any){
    return this.http.delete<any>(this.baseUrl+'/admin/'+ id);
  }

  updateAdmin(data:any, id:number){
    return this.http.put<any>(this.baseUrl+'/admin/'+ id, data);
  }

}