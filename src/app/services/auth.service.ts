import {Injectable, Output, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import config from '../config/index';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() getCurrentUser: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${config.apiUrl}/login`, {email, password}).pipe(
      tap(res => {
        const data = res.data;
        if (data.user && data.token) {
          this.getCurrentUser.emit(data.user);
          localStorage.setItem('currentUser',
            JSON.stringify({email: data.user.email, token: data.token}));
        }
      })
    );
  }

  signUp(data: {}): Observable<any> {
    return this.http.post(`${config.apiUrl}/register`, data).pipe(
      tap(res => {
        const dataObj = res.data;
        if (dataObj.user && dataObj.token) {
          this.getCurrentUser.emit(dataObj.user);
          localStorage.setItem('currentUser',
            JSON.stringify({email: dataObj.user.email, token: dataObj.token}));
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }
}
