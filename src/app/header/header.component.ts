import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<boolean>;
  constructor(private authService: AuthService) {
    this.authState = this.authService.isAuthenticated()
    

  }

  ngOnInit() {
   // this.authService.checkAuthenticated();
  }
  signout() {
    this.authService.signout()
  }

}
