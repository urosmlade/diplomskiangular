import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Korisnik } from 'src/Model/korisnik.model';
import { Uloga } from 'src/Model/uloga.model';



@Injectable({
  providedIn: 'root'
})


export class UserService {
  dataChange:BehaviorSubject<Uloga[]>= new BehaviorSubject<Uloga[]>([]);

  private url = 'https://flashcards-kartice.herokuapp.com/api/auth/korisnik/username/'
  public pisac:string;
  usernames:Array<String>;
  constructor(private http: HttpClient) { }

  getOne(username:String):Observable<Korisnik>{
    return this.http.get<Korisnik>(this.url + username);
  }

  public getPisac(){
    return this.pisac;
  }

  public setPisac(pisac:string){
    this.pisac = pisac;
  }
}
