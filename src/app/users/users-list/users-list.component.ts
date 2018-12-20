import { Component, OnInit } from '@angular/core';

import { UsersService } from '../users.service';
import { User } from './user.model';
import { Subscription } from 'rxjs';
import { PopupLoadingComponent } from 'src/app/shared/popUp/popUp-loading/popUp-loading.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  constructor(private usersService: UsersService, private modalService: NgbModal) { }

  ngOnInit() {
    setTimeout(() => {
      this.loadingMsgRef = this.modalService.open(PopupLoadingComponent);
      this.loadingMsgRef.componentInstance.message = 'Loading Users';
    });
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
  loadMoreUsers() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.usersService.getUsers(this.currentPage).subscribe(
        users => {
          this.users = this.users.concat(users['data']);
          this.totalPages = users['total_pages'];
          console.log(this.users);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

}
