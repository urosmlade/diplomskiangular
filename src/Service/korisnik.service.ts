import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Korisnik } from 'src/Model/korisnik.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { KategorijaService } from './Kategorija.service';
import { Kategorija } from 'src/Model/kategorija.model';
import { UsernameService } from './username.service';

@Injectable()
export class KorisnikService{

        
    private readonly API_URL_K = 'https://flashcards-kartice.herokuapp.com/api/auth/korisnik/';
    private urllike = 'https://flashcards-kartice.herokuapp.com/api/auth/korisnik/lajk/';
    private urlkorisnikkategorija = 'https://flashcards-kartice.herokuapp.com/api/auth/korisnik/kategorija/';
    private urlkorisnikkategorijaPostavi = 'https://flashcards-kartice.herokuapp.com/api/auth/korisnik/username/';
    private urlgetKategorijabyUser = 'https://flashcards-kartice.herokuapp.com/api/auth/korisnik/username/kategorije/';


    dataChange:BehaviorSubject<Korisnik[]> = new BehaviorSubject<Korisnik[]>([]);
    dataChangee:BehaviorSubject<Kategorija[]> = new BehaviorSubject<Kategorija[]>([]);
    korisnik:BehaviorSubject<Korisnik[]> = new BehaviorSubject<Korisnik[]>([]);

    string:String[];
    email:String;

    public getKategorijaByUser():Observable<Kategorija[]>{
        this.httpClient.get<Kategorija[]>(this.urlgetKategorijabyUser + this.usernameService.decrypt()).subscribe(data=>{
            this.dataChangee.next(data);
        },
        (error:HttpErrorResponse)=>{
            console.log(error.name + ' ' + error.message);
        });
        return this.dataChangee.asObservable();
    }


    getEmail(){
        return this.email;
    }

    setEmail(email:String){
        this.email = email;
    }


    constructor (private httpClient:HttpClient, 
        private kategorijaService:KategorijaService,
        private usernameService:UsernameService){}



    public korisnikKategorijaPostavi(kategorija:Kategorija){
        this.httpClient.post(this.urlkorisnikkategorijaPostavi + this.email + '/'+this.kategorijaService.getKategorija(),kategorija).subscribe();
    }

    public korisnikKategorijaObrisi(){
        this.httpClient.delete(this.urlkorisnikkategorijaPostavi + this.email + '/'+this.kategorijaService.getKategorija()).subscribe();
    }


    public getAllUserByKategorija(naziv:string):Observable<Korisnik[]>{
        this.httpClient.get<Korisnik[]>(this.urlkorisnikkategorija +this.usernameService.decrypt()+'/'+naziv).subscribe(data=>{
            this.dataChange.next(data);
        },
        (error:HttpErrorResponse)=>{
            console.log(error.name + ' ' + error.message);
        });
        return this.dataChange.asObservable();
    }

    public getAllLajk(lajk:String):Observable<Korisnik[]>{
        this.httpClient.get<Korisnik[]>(this.urllike + lajk).subscribe(data=>{
            this.dataChange.next(data);
        },
        (error:HttpErrorResponse)=>{
            console.log(error.name + ' ' + error.message);
        });
        return this.dataChange.asObservable();
    }



    
    public getAllKorisnik():Observable<Korisnik[]>{
        this.httpClient.get<Korisnik[]>(this.API_URL_K).subscribe(data=>{
            this.korisnik.next(data);
        },
        (error:HttpErrorResponse)=>{
            console.log(error.name + ' ' + error.message);
        });
        return this.korisnik.asObservable();
    }

}