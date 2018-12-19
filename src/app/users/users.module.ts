import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersListComponent } from './users-list/users-list.component';
import { UserRowComponent } from './users-list/user-row/user-row.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserRemoveComponent } from './user/user-remove/user-remove.component';
import { UsersRoutingModule } from './users-routing.module';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RemovePopComponent } from './popMsgs/remove-pop/remove-pop.component';
import { LoadingComponent } from './popMsgs/loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgbModule
  ],
  declarations: [UsersListComponent, UserRowComponent,
    UserComponent, UserFormComponent, UserProfileComponent,
    UserRemoveComponent, UsersComponent, RemovePopComponent, LoadingComponent],
  entryComponents: [RemovePopComponent, LoadingComponent]
})
export class UsersModule { }
