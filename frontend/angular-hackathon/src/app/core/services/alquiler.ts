import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alquiler } from '../interfaces/alquiler';

@Injectable({
  providedIn: 'root',
})
export class AlquilerService {
  private http = inject(HttpClient);
  private apiUrl = '/api/alquiler';

  getAll(): Observable<Alquiler[]> {
    return this.http.get<Alquiler[]>(this.apiUrl);
  }

  create(alquiler: Alquiler): Observable<Alquiler> {
    return this.http.post<Alquiler>(this.apiUrl, alquiler);
  }

  update(id: string, alquiler: Alquiler): Observable<Alquiler> {
    return this.http.put<Alquiler>(`${this.apiUrl}/${id}`, alquiler);
  }

  // NUEVO: Actualizar únicamente el estado del alquiler
  updateEstado(id: string, estado: string): Observable<Alquiler> {
    return this.http.patch<Alquiler>(`${this.apiUrl}/${id}/estado/${estado}`, {});
  }

  // Borrado Físico (Definitivo)
  physicalDelete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}