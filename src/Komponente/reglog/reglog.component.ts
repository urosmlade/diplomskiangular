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
  usernamepostoji:String;
  constructor(public authService: AuthService) { }

  greska:string;


  ngOnInit() { 
  }

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
        if(this.form.name==null || this.form.name == ''){
          this.errorMessage = 'Morate uneti ime';
        }else if(this.form.prezime == null || this.form.prezime == ''){
          this.errorMessage = "Morate uneti prezime"
        }else if(this.form.username == null || this.form.username == ''){
          this.errorMessage = "Morate uneti username"
        }else if(this.form.email == null || this.form.email == ''){
          this.errorMessage = "Morate uneti email"
        }else if(this.form.password == null || this.form.password == ''){
          this.errorMessage = "Morate uneti lozinku"
        }else if(this.form.password.length <= 6){
          this.errorMessage = "Lozinka mora imati minimum 6 karaktera"
        }
        
        else{
        this.errorMessage = error.error.message;
      }
      this.isSignUpFailed = true;

    }
      
    );
    
    

  }

 



}
