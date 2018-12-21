import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { Observable, Subscriber } from 'rxjs';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
    //check if authenticated pass true
    //not authenticated pass false and route user to sign in page
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        console.log('canActivate can load');
        if (this.authService.check()) {
           
            
            return true;
        }
        this.router.navigate(['/signin']);
        return false;
    }
    canLoad(): any {
        console.log('auth guard can load');
        if (this.authService.check()) {
            console.log('auth guard can load');
            return true;
        }
        this.router.navigate(['/signin']);
        return false;
    }
}