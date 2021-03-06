import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { AuthGuard } from '../auth/auth.guard';

const usersRoutes: Routes = [
  {
    path: '', component: UsersComponent, children: [
      { path: 'new', component: UserFormComponent, canActivate: [AuthGuard] },
      { path: ':id/edit', component: UserFormComponent },
      { path: ':id', component: UserProfileComponent }
    ], canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(usersRoutes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}