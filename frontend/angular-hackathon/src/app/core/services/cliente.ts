import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente';
@Injectable({
  providedIn: 'root',
})
export class ClienteService {
   private http = inject(HttpClient);
  private apiUrl = '/api/cliente' 
  getAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  update(id: string, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente);
  }

  // Borrado lógico (puede ser un PATCH o un DELETE según API en Spring Boot)
  logicalDelete(id: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/delete`, {});
  }

  // Restaurar registro
  restore(id: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/restore`, {});
  }

  // Borrado Físico (Definitivo)
  physicalDelete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
