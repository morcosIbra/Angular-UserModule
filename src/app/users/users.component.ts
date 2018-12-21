import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  subscription: Subscription;
  response: {};
  showUserCard = false;
  constructor(private userService: UsersService, private router: Router) { 
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        console.log(e.url, e.url.includes("/users/"))
        this.showUserCard = e.url.includes("/users/")
      }
    });
  }

  ngOnInit() {
    this.subscription = this.userService.actionStatus().subscribe(response => {
      console.log('message= ', response);
      this.response = response;
      setTimeout(() => {
        this.response = {};
      }, 3000)
    });
  }
}


