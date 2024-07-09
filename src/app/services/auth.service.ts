import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    usuarioLogadoEv = new EventEmitter
    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<string> {
      return this.http.post<string>(`${environment.apiUrl}/auth/login`, { email, password });
    }

    logout(): Observable<void> {
      return this.http.post<void>(`${environment.apiUrl}/logout`, {});
    }
}
