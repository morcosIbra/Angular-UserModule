import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { URL } from '../shared';
const SIGNIN = 'SIGNIN';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL: string;
  private authSubject = new Subject<boolean>();
  constructor(private http: HttpClient) {
    this.URL = URL;
  }
  private handleError(error: HttpErrorResponse, requestType: string) {
    console.log(error);
    let returnMsg: string;
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      returnMsg = 'Please check network reachability and try again.'
    } else {
      // The backend returned an unsuccessful response code.
      switch (requestType) {
        case SIGNIN:
          returnMsg = 'Error ocurred while signing in'
          break;
        default:
          returnMsg = 'Error ocurred'
          break;
      }
    }
    // return an observable with a user-facing error message
    return throwError(returnMsg);
  }
  signin(email, password) {
    const credentials = {
      email: email, password: password
    };
    return this.http.post(this.URL + 'login', credentials).pipe(
      map(res => {
        console.log(res);
        localStorage.setItem('token', res['token']);
        this.authSubject.next(true);
      }),
      catchError(error => {
        this.authSubject.next(false);
        return this.handleError(error, SIGNIN)
      })
    );
  }
  signout() {
    localStorage.removeItem('token');
    this.authSubject.next(false);
  }
  triggerIsAuthenticated() {
    if (localStorage.getItem('token')) {
      console.log('isAuthenticated token');
      this.authSubject.next(true);
    } else {
      console.log('isAuthenticated notoken');
      this.authSubject.next(false);
    }
  }

  isAuthenticated() {
    return this.authSubject.asObservable();
  }
  check() {
    if (localStorage.getItem('token')) {
      console.log('token');
      return true
    } else {
      console.log('notoken');
      return false
    }
  }
}
