import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() { }
//interceptor pass token if stored to server requests
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted!', req);
        const token = localStorage.token;
        const copiedReq = req.clone({ params: req.params.set('auth', token) });
        return next.handle(copiedReq);
    }
}
