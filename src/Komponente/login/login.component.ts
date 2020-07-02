import { Component, OnInit } from '@angular/core';
import { AuthLoginInfo } from 'src/auth/login-info';
import { AuthService } from 'src/auth/auth.service';
import { Router } from '@angular/router';
import { UsernameService } from 'src/Service/username.service';
const USERNAME_KEY = 'AuthUsername';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  form: any = {}; 
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  private loginInfo: AuthLoginInfo;
  encryptedText: string;
  constructor(public authService: AuthService,
      public router: Router,
      public usernameService: UsernameService) {}

  ngOnInit() {

      if (this.isLoggedIn) {
          this.router.navigate(['/flashcards']);

      }

  }

  onSubmit() {

      this.loginInfo = new AuthLoginInfo(
          this.form.username,
          this.form.password);

      this.authService.attemptAuth(this.loginInfo).subscribe(
          data => {
              this.usernameService.setUsername(data.username);
              this.encryptedText = this.usernameService.encrypt(this.usernameService.getUsername());
              window.localStorage.setItem(USERNAME_KEY, this.encryptedText);
              this.isLoginFailed = false;
              this.isLoggedIn = true;
              this.router.navigate(['/flashcards']);
          },
          error => {
              console.log(error);
              this.errorMessage = error.error.message;
              this.isLoginFailed = true;
          }
      );
  }

}