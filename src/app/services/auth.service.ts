import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import config from '../config/index';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${config.apiUrl}/me`);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${config.apiUrl}/login`, {email, password}).pipe(
      tap(res => { 
        const data = res.data;
        if (data.user && data.token) {
          localStorage.setItem('currentUser',
            JSON.stringify({email: data.user.email, token: data.token}));
        }
      })
    );
  }

  signUp(data: {}): Observable<any> {
    return this.http.post(`${config.apiUrl}/register`, data).pipe(
      tap(res => { 
        const data = res.data;
        if (data.user && data.token) {
          localStorage.setItem('currentUser',
            JSON.stringify({email: data.user.email, token: data.token}));
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }
}
