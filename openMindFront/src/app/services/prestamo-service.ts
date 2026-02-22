import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prestamo } from '../../models/prestamo.model';

@Injectable({
  providedIn: 'root',
})
export class PrestamoService {
  private apiUrl = `${environment.apiUrl}/prestamos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(this.apiUrl);
  }

  create(prestamo: Prestamo): Observable<Prestamo> {
    return this.http.post<Prestamo>(this.apiUrl, prestamo);
  }

  devolver(id: number): Observable<Prestamo> {
    return this.http.put<Prestamo>(`${this.apiUrl}/${id}/devolver`, {});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
