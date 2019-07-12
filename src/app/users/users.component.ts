import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from './users.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit ,OnDestroy{
  actionStatus$: Subscription;
  response: {};
  showUserCard = false;
  constructor(private userService: UsersService, private router: Router) {
    //detect if user-form or user-profile 
    //triggered then shrink width of users list by showUserCard flag  
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        console.log(e.url, e.url.includes("/users/"))
        this.showUserCard = e.url.includes("/users/")
      }
    });
  }

  ngOnInit() {
    //listen to messages come from userService.actionStatus() after any user action taken
    //and displayed for 3 seconds only
    this.actionStatus$ = this.userService.actionStatus().subscribe(response => {
      console.log('message= ', response);
      this.response = response;
      setTimeout(() => {
        this.response = {};
      }, 3000)
    });
  }
  ngOnDestroy(): void {
  
    this.actionStatus$.unsubscribe()
  }
}


