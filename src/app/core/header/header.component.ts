import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  authSutateObs: Observable<boolean>;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authSutateObs = this.authService.isAuthenticated()
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.authService.triggerIsAuthenticated();
    });
  }
  signout() {
    this.authService.signout();
    this.router.navigate(['/signin']);
  }

}
