import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  subscription: Subscription;
  response: {};
  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.subscription = this.userService.actionStatus().subscribe(response => {
      console.log('message= ', response);
      this.response = response;
      setTimeout(() => {
        this.response = {};
      }, 5000)
    });
  }
}


