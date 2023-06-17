import { Doacao } from './../model/doacao';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DoacaoService {

  constructor(private httpClient: HttpClient) { }

  // Obtem todas as Doações
  getDoacoes(): Observable<Doacao[]> {
    return this.httpClient.get<Doacao[]>(`${environment.url}/doacoes`);
  }

  // Obtem uma Doação pelo id
  getDoacaoById(id: any): Observable<Doacao> {
    return this.httpClient.get<Doacao>(`${environment.url}/doacoes/` + id);
  }

  getDoacaoByPessoaFisica(id: any): Observable<Doacao[]> {
    return this.httpClient.get<Doacao[]>(`${environment.url}/doacoes/doacaobypessoafisica/` + id);
  }

  getDoacaoByPessoaJuridica(id: any): Observable<Doacao[]> {
    return this.httpClient.get<Doacao[]>(`${environment.url}/doacoes/doacaobypessoajuridica/` + id);
  }

  getDoacaoByDoacaoCategoria(categoria: any): Observable<Doacao[]> {
    return this.httpClient.get<Doacao[]>(`${environment.url}/doacoes/doacaobydoacaocategoria/${categoria}`);
  }

  // salva uma Doação
  saveDoacao(doacao: Doacao): Observable<Doacao> {
    return this.httpClient.post<Doacao>(`${environment.url}/doacoes/`, doacao);
  }


  // utualiza uma Doação
  updateDoacao(doacao: Doacao): Observable<Doacao> {
    return this.httpClient.put<Doacao>(`${environment.url}/doacoes/`+ doacao.id, doacao);
  }

  // deleta uma Doação
  deleteDoacao(doacao: Doacao) {
    return this.httpClient.delete<Doacao>(`${environment.url}/doacoes/${doacao.id}`);
      
  }

}