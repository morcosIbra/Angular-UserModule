import { Component, OnInit } from '@angular/core';

import { UsersService } from '../users.service';
import { User } from './user.model';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupLoadingComponent } from 'src/app/shared/popup-loading/popup-loading.component';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[];
  usersChanged: Subscription;
  currentPage: number;
  totalPages: number;
  loadingMsgRef: any;
  loadingMore = false;
  constructor(private usersService: UsersService, private modalService: NgbModal) { }

  ngOnInit() {
    //popup loading before get users and closed after usersService.getUsers response
    setTimeout(() => {
      this.loadingMsgRef = this.modalService.open(PopupLoadingComponent);
      this.loadingMsgRef.componentInstance.message = 'Loading Users';
    });
    //request only first page from users at initialisation
    this.currentPage = 1;
    this.usersService.getUsers(this.currentPage).subscribe(
      users => {
        this.users = users['data'];
        this.totalPages = users['total_pages'];
        console.log(this.users);
        this.loadingMsgRef.close();
      },
      error => {
        console.log(error);
        this.users = [];
        this.loadingMsgRef.close();
      }
    );
    this.usersChanged = this.usersService.usersChanged.subscribe(
      users => {
        this.users = users;
      }
    );
  }
  
  //get aother pages of users if not exceeded the max total pages
  loadMoreUsers() {
    if (this.currentPage < this.totalPages) {
      this.loadingMore = true;
      this.currentPage++;
      this.usersService.getUsers(this.currentPage).subscribe(
        users => {
          this.users = this.users.concat(users['data']);
          this.totalPages = users['total_pages'];
          console.log(this.users);
          this.loadingMore = false;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

}
