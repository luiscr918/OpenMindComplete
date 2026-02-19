import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ejemplar } from '../../models/ejemplar.model';

@Injectable({
  providedIn: 'root',
})
export class EjemplarService {
  private apiUrl = `${environment.apiUrl}/ejemplares`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Ejemplar[]> {
    return this.http.get<Ejemplar[]>(this.apiUrl);
  }

  getById(id: number): Observable<Ejemplar> {
    return this.http.get<Ejemplar>(`${this.apiUrl}/${id}`);
  }

  create(Ejemplar: Ejemplar): Observable<Ejemplar> {
    return this.http.post<Ejemplar>(this.apiUrl, Ejemplar);
  }

  update(id: number, Ejemplar: Ejemplar): Observable<Ejemplar> {
    return this.http.put<Ejemplar>(`${this.apiUrl}/${id}`, Ejemplar);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
