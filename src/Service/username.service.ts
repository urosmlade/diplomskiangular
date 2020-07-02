import { Injectable } from "@angular/core";
import * as CryptoJS from 'crypto-js';
const USERNAME_KEY = 'AuthUsername';

@Injectable()
export class UsernameService{

    private username:string;
    secretKey = "urosmlade";

    public setUsername(username:string){
        this.username = username;
    }

    public getUsername(){
        return this.username;
    }

    encrypt(value : string) : string{
        return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
    }

    decrypt(){
        return CryptoJS.AES.decrypt(window.localStorage.getItem(USERNAME_KEY), this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
    }

    encryptedText:string  = this.encrypt(this.getUsername());

     
    sacuvaj(){
        window.localStorage.setItem(USERNAME_KEY ,this.encryptedText);
    }

}