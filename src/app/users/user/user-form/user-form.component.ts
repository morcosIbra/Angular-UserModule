import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { UsersService } from '../../users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopIconComponent } from '../../pop-icon/pop-icon.component';
import { User } from '../../users-list/user.model';
import { _localeFactory } from '@angular/core/src/application_module';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  id: number;
  editMode = false;
  userForm: FormGroup;
  constructor(private route: ActivatedRoute, private router: Router,
    private usersService: UsersService, private modalService: NgbModal) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }
  private initForm() {
    this.userForm = new FormGroup({
      first_name: new FormControl(null),
      last_name: new FormControl(null),
      avatar: new FormControl(null),
      job: new FormControl(null)
    });
    if (this.editMode) {
      this.usersService.getUser(this.id).subscribe(
        userData => {
          console.log(userData);
          this.userForm = new FormGroup({
            first_name: new FormControl(userData.first_name),
            last_name: new FormControl(userData.last_name),
            avatar: new FormControl(userData.avatar),
            job: new FormControl(userData.job)
          });
          console.log(this.userForm);
        }, // success path
        error => {
          console.log(error);
        }
      );
    }

  }
  onSubmit() {
    // const modalRef = this.modalService.open(PopIconComponent)
    // //modalRef.close()
    // modalRef.result.then(
    //   res => {
    //     console.log(res);

    //   },
    //   err => {
    //     console.log(err);

    //   }
    // );
    // modalRef.componentInstance.name = 'World';
    // setTimeout(()=>{

    // })
    if (this.editMode) {
      this.usersService.updateUser(this.id, this.userForm.value).subscribe(
        userData => {
          this.router.navigate(['../'], { relativeTo: this.route });
        }, // success path
        error => {
          console.log(error);
        }
      );
    } else {
      this.usersService.createUser(this.userForm.value).subscribe(
        userData => {
          console.log(userData);
          this.router.navigate(['../' + userData['id']], { relativeTo: this.route });
        }, // success path
        error => {
          console.log(error);
        }
      );
    }

  }


}
