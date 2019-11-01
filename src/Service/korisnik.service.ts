import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Korisnik } from 'src/Model/korisnik.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import { TokenStorageService } from 'src/auth/token-storage.service';
import { KategorijaService } from './Kategorija.service';
import { Kategorija } from 'src/Model/kategorija.model';
import { UsernameService } from './username.service';
//const dannoc = 'dannoc';

@Injectable()
export class KorisnikService{

    
    private readonly API_URL_R = 'http://localhost:8083/register/';
    private readonly API_URL_L = 'http://localhost:8083/login/';
    private readonly API_URL_K = 'http://localhost:8083/api/auth/korisnik';
    private urllike = 'http://localhost:8083/api/auth/korisnik/lajk/';
    private urlkorisnikkategorija = 'http://localhost:8083/api/auth/korisnik/kategorija/';
    private urlkorisnikkategorijaPostavi = 'http://localhost:8083/api/auth/korisnik/username/';
    private urlgetKategorijabyUSer = 'http://localhost:8083/api/auth/korisnik/username/kategorije/';


    dataChange:BehaviorSubject<Korisnik[]> = new BehaviorSubject<Korisnik[]>([]);
    lajk:BehaviorSubject<String[]> = new BehaviorSubject<String[]>([]);
    dataChangee:BehaviorSubject<Kategorija[]> = new BehaviorSubject<Kategorija[]>([]);
    korisnik:BehaviorSubject<Korisnik[]> = new BehaviorSubject<Korisnik[]>([]);

    string:String[];

    email:String;

    public getKategorijaByUser():Observable<Kategorija[]>{
        this.httpClient.get<Kategorija[]>(this.urlgetKategorijabyUSer + this.usernameService.decrypt()).subscribe(data=>{
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
       // private token:TokenStorageService, 
        private kategorijaService:KategorijaService,
        private usernameService:UsernameService){}



    public korisnikKategorijaPostavi(kategorija:Kategorija){
        this.httpClient.post(this.urlkorisnikkategorijaPostavi + this.email + '/'+this.kategorijaService.getKategorija(),kategorija).subscribe();
    }

    public korisnikKategorijaObrisi(){
        this.httpClient.delete(this.urlkorisnikkategorijaPostavi + this.email + '/'+this.kategorijaService.getKategorija()).subscribe();
    }


    /*
    public korisnikkategorijapost(kategorija:Kategorija){
        this.httpClient.post(this.urlkorisnikkategorija + 'this.token.getUsername()'+'/'+'this.kategorijaService.getKategorija()',kategorija);
    }

*/


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


    public addKorisnik(korisnik:Korisnik):void{
        this.httpClient.post(this.API_URL_R,korisnik).subscribe();
    }

    public getOneKorisnik(id:number):Observable<Korisnik>{
        return this.httpClient.get<Korisnik>(this.API_URL_K + id);
    }

}