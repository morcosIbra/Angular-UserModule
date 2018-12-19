import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { URL } from '../shared';
const SIGNIN = 'SIGNIN';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL: string;
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
      }),
      catchError(error => this.handleError(error, SIGNIN))
    );
  }
}
