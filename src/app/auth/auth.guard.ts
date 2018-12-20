import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { Observable, Subscriber } from 'rxjs';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {

    constructor(private authService: AuthService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        if (this.authService.check()) {
            return true;
        }
        this.router.navigate(['/signin']);
        return false;
    }
    canLoad(): any {
        if (this.authService.check()) {
            return true;
        }
        this.router.navigate(['/signin']);
        return false;
    }
}