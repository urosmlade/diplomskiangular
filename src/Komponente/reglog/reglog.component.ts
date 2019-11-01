import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/auth/auth.service';
import { SignUpInfo } from 'src/auth/signup-info';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reglog',
  templateUrl: './reglog.component.html',
  styleUrls: ['./reglog.component.css']
})
export class ReglogComponent implements OnInit {

  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  onSubmit() {

    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.prezime,
      this.form.username,
      this.form.email,
      this.form.password);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'Morate uneti email' :
        this.email.hasError('email') ? 'Email nije vazeci' :
            '';
  }


}
