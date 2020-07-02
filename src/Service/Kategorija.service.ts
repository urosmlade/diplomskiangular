import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from 'rxjs';
import { Kategorija } from 'src/Model/kategorija.model';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';


@Injectable()
export class KategorijaService{

    kategorija:string;

    constructor (private httpClient:HttpClient){}

    dataKat:BehaviorSubject<Kategorija[]> = new BehaviorSubject<Kategorija[]>([]);

    private kategorijaURL = 'https://flashcards-kartice.herokuapp.com/api/auth/kategorija';
        

    public getAllKategorija():Observable<Kategorija[]>{
        this.httpClient.get<Kategorija[]>(this.kategorijaURL).subscribe(data=>{
            this.dataKat.next(data);
        },
        
        (error:HttpErrorResponse)=>{
            console.log(error.name + ' ' + error.message);
        });
        return this.dataKat.asObservable();
    }
    

    public getKategorija(){
        return this.kategorija;
    }

    public setKategorija(kategorija:string){
        this.kategorija = kategorija;
    }
        

}