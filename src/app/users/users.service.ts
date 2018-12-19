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
export const ACTION_SUCCESS = 'ACTION_SUCCESS';
export const ACTION_FAIL = 'ACTION_FAIL'
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  URL: string;
  users: User[];
  private actionStatSubject = new Subject<any>();
  constructor(private http: HttpClient) {
    this.URL = URL + 'users/';
  }
  actionStatus() {
    return this.actionStatSubject.asObservable();
  }
  private returnResponse(error: any, requestType: string) {
    console.log(error);
    let message: string;
    const status = !error ? ACTION_SUCCESS : ACTION_FAIL;
    console.log(status);

    if (!error) {
      switch (requestType) {

        case CREATE_USER:
          message = 'User created successfully'
          break;
        case UPDATE_USER:
          message = 'User updated successfully'
          break;
        case REMOVE_USER:
          message = 'User removed successfully'
          break;
        default:
          message = 'success!'
          break;
      }
    } else {
      if (error.status === 0) {
        // A client-side or network error occurred. Handle it accordingly.
        message = 'Please check network reachability and try again.'
      } else {
        // The backend returned an unsuccessful response code.
        switch (requestType) {
          case GET_USERS:
            message = 'Error ocurred while recieving users'
            break;
          case GET_USER:
            message = 'Error ocurred while recieving user info'
            break;
          case CREATE_USER:
            message = 'Error ocurred while creating user'
            break;
          case UPDATE_USER:
            message = 'Error ocurred while updating user'
            break;
          case REMOVE_USER:
            message = 'Error ocurred while removing user'
            break;
          default:
            message = 'Error ocurred'
            break;
        }
      }
    }
    this.actionStatSubject.next({
      action: requestType, status: status, message: message
    });
  }
  getUsers(currentPage) {
    const options = currentPage ?
      { params: new HttpParams().set('page', currentPage) } : {};
    return this.http.get(this.URL, options).pipe(
      map(response => {
        this.users = response['data'];
        return response;
      }),
      catchError(error => {
        return error;
      })
    );
  }
  getUser(id): any {
    return this.http.get(this.URL + id).pipe(
      map(response => {
        return response['data'];
      }),
      catchError(error => {
        return error;
      })
    );
  }
  createUser(userData) {
    console.log(this.URL, userData);
    return this.http.post(this.URL, userData).pipe(
      map(userdata => {
        this.returnResponse(false, CREATE_USER);
        return userdata;
      }),
      catchError(error => {
        this.returnResponse(error, CREATE_USER);
        return error;
      })
    );
  }
  updateUser(id, userData) {
    return this.http.put<User>(this.URL + id, userData).pipe(
      map(userProfile => {
        console.log(userProfile);
        this.returnResponse(false, UPDATE_USER);
        return userProfile;
      }),
      catchError(error => {
        this.returnResponse(error, UPDATE_USER);
        return error;
      })
    );
  }
  removeUser(id) {
    return this.http.delete(this.URL + id).pipe(
      map(response => {
        this.returnResponse(false, REMOVE_USER);
        return response;
      }),
      catchError(error => {
        this.returnResponse(error, REMOVE_USER);
        return error;
      })
    );
  }

}
