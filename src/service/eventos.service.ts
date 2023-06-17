import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Evento } from 'src/model/evento';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(private httpClient: HttpClient) { }

  getEventos(): Observable<Evento[]> {
    return this.httpClient.get<Evento[]>(`${environment.url}/eventos`);
  }

  getEventoById(id: any): Observable<Evento> {
    return this.httpClient.get<Evento>(`${environment.url}/eventos/` + id);
  }

  saveEvento(evento: Evento): Observable<Evento> {
    return this.httpClient.post<Evento>(`${environment.url}/eventos/`, evento);
  }

  updateEvento(evento: Evento): Observable<Evento> {
    return this.httpClient.put<Evento>(`${environment.url}/eventos/` + evento.id, evento);
  }

  deleteEvento(evento: Evento) {
    return this.httpClient.delete<Evento>(`${environment.url}/eventos/${evento.id}`);
  }

}