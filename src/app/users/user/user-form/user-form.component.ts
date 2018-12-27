import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { _localeFactory } from '@angular/core/src/application_module';
import { PopupLoadingComponent } from 'src/app/shared/popup-loading/popup-loading.component';

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
  //detect update exist user or create new one and then initialise form
  private initForm() {
    this.userForm = new FormGroup({
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      avatar: new FormControl(null),
      job: new FormControl(null)
    });
    if (this.editMode) {
      this.usersService.getUser(this.id).subscribe(
        userData => {
          console.log(userData);
          this.userForm = new FormGroup({
            first_name: new FormControl(userData.first_name, Validators.required),
            last_name: new FormControl(userData.last_name, Validators.required),
            avatar: new FormControl(userData.avatar),
            job: new FormControl(userData.job)
          });
          console.log(this.userForm);
        }, // success path
        error => {
          console.log(error);
          this.router.navigate(['/users'], { relativeTo: this.route });
        }
      );
     // this.usersService.getUser(this.id)
    }

  }
 //on submit if success and exist user ---> route to users-list page 
 // if error happened stay at user-form page
  onSubmit() {
    const loadingMsgRef = this.modalService.open(PopupLoadingComponent);
    loadingMsgRef.componentInstance.message = 'Saving user' ;
    if (this.editMode) {
      this.usersService.updateUser(this.id, this.userForm.value).subscribe(
        userData => {
          this.router.navigate(['../'], { relativeTo: this.route });
          loadingMsgRef.dismiss()
        }, 
        error => {
          console.log(error);
          loadingMsgRef.dismiss()
        }
      );
    } else {
      this.usersService.createUser(this.userForm.value).subscribe(
        userData => {
          console.log(userData);
          // this.router.navigate(['../' + userData['id']], { relativeTo: this.route });
          loadingMsgRef.dismiss()
          this.userForm.reset();
        }, // success path
        error => {
          console.log(error);
          loadingMsgRef.dismiss()
        }
      );
    }
  }
  

}
