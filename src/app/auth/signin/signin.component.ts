import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { log } from 'util';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  errorMsg: string;
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    // initialise signin form
    this.signinForm = new FormGroup({
      email: new FormControl('eve.holt@reqres.in', [Validators.required, Validators.email]),
      password: new FormControl('cityslicka', Validators.required)
    });
    console.log(this.signinForm);

  }

  onSignin() {
    this.errorMsg = null
    const email = this.signinForm.value.email;
    const password = this.signinForm.value.password;
    this.authService.signin(email, password).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['../users'], { relativeTo: this.route });
      },
      error => {
        console.log(error);
        this.errorMsg = error
      }
    )
  }

}
