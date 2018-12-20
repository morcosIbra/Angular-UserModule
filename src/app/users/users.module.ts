import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersListComponent } from './users-list/users-list.component';
import { UserRowComponent } from './users-list/user-row/user-row.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UsersRoutingModule } from './users-routing.module';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [UsersListComponent, UserRowComponent,
    UserComponent, UserFormComponent, UserProfileComponent,
    UsersComponent]
})
export class UsersModule { }
