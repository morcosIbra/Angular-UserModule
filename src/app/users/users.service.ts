import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { throwError, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './users-list/user.model';
import { URL } from '../shared'
const GET_USERS = 'GET_USERS';
const GET_USER = 'GET_USER';
const CREATE_USER = 'CREATE_USER';
const UPDATE_USER = 'UPDATE_USER';
const REMOVE_USER = 'REMOVE_USER';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  URL: string;
  users: User[];
  constructor(private http: HttpClient) {

    this.URL = URL + 'users/';
    
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
        case GET_USERS:
          returnMsg = 'Error ocurred while recieving users'
          break;
        case GET_USER:
          returnMsg = 'Error ocurred while recieving user info'
          break;
        case CREATE_USER:
          returnMsg = 'Error ocurred while creating user'
          break;
        case UPDATE_USER:
          returnMsg = 'Error ocurred while updating user'
          break;
        case REMOVE_USER:
          returnMsg = 'Error ocurred while removing user'
          break;
        default:
          returnMsg = 'Error ocurred'
          break;
      }
    }
    // return an observable with a user-facing error message
    return throwError(returnMsg);
  }

  getUsers(currentPage) {
    const options = currentPage ?
      { params: new HttpParams().set('page', currentPage) } : {};
    return this.http.get(this.URL, options).pipe(
      map(response => {
        this.users = response['data'];
        return response;
      }),
      catchError(error => this.handleError(error, GET_USERS))
    );
  }
  getUser(id): any {
    // console.log(this.users[id]);

    // if (this.users !== undefined && this.users[id] !== undefined) {
    //   console.log(this.users[id]);

    //   const existUser = new Subject<any>();
    //   return existUser.pipe(map(res => {
    //     console.log(res);

    //     return this.users[id];
    //   }
    //   ));
    // }
    return this.http.get(this.URL + id).pipe(
      map(response => {
        return response['data'];
      }),
      catchError(error => this.handleError(error, GET_USER))
    );
  }
  createUser(userData) {
    return this.http.post(this.URL, userData).pipe(

      catchError(error => this.handleError(error, CREATE_USER))
    );
  }
  updateUser(id, userData) {

    return this.http.put(this.URL + '/' + id, userData).pipe(
      catchError(error => this.handleError(error, UPDATE_USER))
    );
  }
  removeUser(id) {
    return this.http.delete(this.URL + '/' + id).pipe(
      catchError(error => this.handleError(error, REMOVE_USER))
    );
  }
}
