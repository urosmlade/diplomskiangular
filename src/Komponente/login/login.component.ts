import { Component, OnInit } from '@angular/core';
import { AuthLoginInfo } from 'src/auth/login-info';
import { AuthService } from 'src/auth/auth.service';
//import { TokenStorageService } from 'src/auth/token-storage.service';
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

  //conversionEncryptOutput: string;  
  //conversionDecryptOutput:string;  
  encryptedText:string;
  constructor(private authService: AuthService, 
              //private tokenStorage: TokenStorageService, 
              private router:Router,
              private usernameService:UsernameService) { }

  ngOnInit() {


   if(this.isLoggedIn){
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

       this.encryptedText  = this.usernameService.encrypt(this.usernameService.getUsername());

       window.sessionStorage.setItem(USERNAME_KEY ,this.encryptedText);
        

        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this.router.navigate(['/flashcards']);
      },
      error => {

       /* if(this.form.username==null || this.form.username == ''){
          this.errorMessage = 'Morate uneti username';
        }else if(this.form.password == null || this.form.password == ''){
          this.errorMessage = "Morate uneti lozinku"
        }else{*/
          console.log(error);
          this.errorMessage = error.error.message;
          this.isLoginFailed = true;
       // }

       
      }
    );
  }

}
