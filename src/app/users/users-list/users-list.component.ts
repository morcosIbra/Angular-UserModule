import { Component, OnInit } from '@angular/core';

import { UsersService } from '../users.service';
import { User } from './user.model';
//import { userActions } from '../user/user-actions.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[];
  // userInAction: User;
  // userAction: string;
  //userActions = userActions;
  currentPage: number;
  totalPages: number;
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.currentPage = 1;
    this.usersService.getUsers(this.currentPage).subscribe(
      users => {
        this.users = users['data'];
        this.totalPages = users['total_pages'];
        console.log(this.users);
      }, // success path
      error => {
        console.log(error);
        this.users = [];
      }
    );
  }
  loadMoreUsers() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.usersService.getUsers(this.currentPage).subscribe(
        users => {
          this.users = this.users.concat(users['data']);
          this.totalPages = users['total_pages'];
          console.log(this.users);
        }, // success path
        error => {
          console.log(error);
        }
      );
    }
  }

}