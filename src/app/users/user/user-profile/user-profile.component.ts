import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsersService } from '../../users.service';
import { User } from '../../users-list/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  id: number;
  user: User;
  constructor(private route: ActivatedRoute, private usersService: UsersService, private router: Router) {
    // if user exist in user service --> get it by usersService.getExistUser
    //if not get user from the server by usersService.getUser
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        console.log(this.id);
        this.user = this.usersService.getExistUser(this.id)
        if (this.user === null) {
          this.usersService.getUser(this.id).subscribe(
            userData => {
              console.log(userData);
              this.user = userData;
            }, // success path
            error => {
              console.log(error);
              this.router.navigate(['/users'], { relativeTo: this.route });
            }
          );
        }

      }
    );
  }

  ngOnInit() {

  }

}
