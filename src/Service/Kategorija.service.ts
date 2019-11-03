import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from 'rxjs';
import { Kategorija } from 'src/Model/kategorija.model';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { UsernameService } from './username.service';


@Injectable()
export class KategorijaService{
    
    constructor (private httpClient:HttpClient){}



    //private urlPrvaKolona = 'http://localhost:8083/api/auth/kategorija/prvakolona';
    //private urlDrugaKolona = 'http://localhost:8083/api/auth/kategorija/drugakolona/';
    //private urlDrugaKolonaSve = 'http://localhost:8083/api/auth/kategorija/drugakolona';



    kategorija:string;




    dataChange:BehaviorSubject<Kategorija[]> = new BehaviorSubject<Kategorija[]>([]);
    dataChangee:BehaviorSubject<Kategorija[]> = new BehaviorSubject<Kategorija[]>([]);
    dataChangeee:BehaviorSubject<Kategorija[]> = new BehaviorSubject<Kategorija[]>([]);


    private kategorijaURL = 'http://localhost:8083/api/auth/kategorija';
    

    dataKat:BehaviorSubject<Kategorija[]> = new BehaviorSubject<Kategorija[]>([]);

    public getAllKategorija():Observable<Kategorija[]>{
        this.httpClient.get<Kategorija[]>(this.kategorijaURL).subscribe(data=>{
            this.dataKat.next(data);
        },
        (error:HttpErrorResponse)=>{
            console.log(error.name + ' ' + error.message);
        });
        return this.dataKat.asObservable();
    }





/*
    public getPrvaKolona():Observable<Kategorija[]>{
        this.httpClient.get<Kategorija[]>(this.urlPrvaKolona).subscribe(data=>{
            this.dataChange.next(data);
        },
        (error:HttpErrorResponse)=>{
            console.log(error.name + ' ' + error.message);
        });
        return this.dataChange.asObservable();
    }


    public getDrugaKolona(kategorija:string):Observable<Kategorija[]>{
        this.httpClient.get<Kategorija[]>(this.urlDrugaKolona + kategorija).subscribe(data=>{
            this.dataChangee.next(data);
        },
        (error:HttpErrorResponse)=>{
            console.log(error.name + ' ' + error.message);
        });
        return this.dataChangee.asObservable();
    }

    public getDrugaKolonaSve():Observable<Kategorija[]>{
        this.httpClient.get<Kategorija[]>(this.urlDrugaKolona).subscribe(data=>{
            this.dataChangeee.next(data);
        },
        (error:HttpErrorResponse)=>{
            console.log(error.name + ' ' + error.message);
        });
        return this.dataChangeee.asObservable();
    }
*/




    
    public getKategorija(){
        return this.kategorija;
      }
    
    public setKategorija(kategorija:string){
        this.kategorija = kategorija;
    }
    
 

}