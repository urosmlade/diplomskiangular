import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Flashcard } from 'src/Model/flashcard.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Kategorija } from 'src/Model/kategorija.model';
//import { TokenStorageService } from 'src/auth/token-storage.service';


@Injectable()
export class FlashcardService{

    private  flashcardsURL = 'http://localhost:8083/api/auth/flashcard/';

 
    pocetnaStrana:BehaviorSubject<Flashcard[]> = new BehaviorSubject<Flashcard[]>([]);
    profil:BehaviorSubject<Flashcard[]> = new BehaviorSubject<Flashcard[]>([]);
    kategorije:BehaviorSubject<Flashcard[]> = new BehaviorSubject<Flashcard[]>([]);
    tudjiprofil:BehaviorSubject<Flashcard[]> = new BehaviorSubject<Flashcard[]>([]);



    public flashcardsPocetnaStranaSamoJavnoS():Observable<Flashcard[]>{
        this.httpClient.get<Flashcard[]>(this.flashcardsURL + 'privatno/' + 0).subscribe(data=>{
            this.pocetnaStrana.next(data);
        },
        (error:HttpErrorResponse)=>{
            console.log(error.name + ' ' + error.message);
        });
        return this.pocetnaStrana.asObservable();
    }



    public flashcardsProfilKorisnikaPrivatnoIJavnoS(autor:string):Observable<Flashcard[]>{
        this.httpClient.get<Flashcard[]>(this.flashcardsURL + 'autor/username/' + autor).subscribe(dataChange=>{
            this.pocetnaStrana.next(dataChange);
        },
        (error:HttpErrorResponse)=>{
            console.log(error.name + ' ' + error.message);
        });
        return this.pocetnaStrana.asObservable();
    }



    public flashcardsPoKategorijiS(naziv:String):Observable<Flashcard[]>{
        this.httpClient.get<Flashcard[]>(this.flashcardsURL + 'kategorijaBean/false/' + naziv).subscribe(dataChange=>{
            this.pocetnaStrana.next(dataChange);
        },
        (error:HttpErrorResponse)=>{
            console.log(error.name + ' ' + error.message);
        });
        return this.pocetnaStrana.asObservable();
    }




    public flashcardsSamoPrivatneDrugogKorisnikaS(username:String):Observable<Flashcard[]>{
        this.httpClient.get<Flashcard[]>(this.flashcardsURL + username +'/0').subscribe(data=>{
            this.pocetnaStrana.next(data);
        },
        (error:HttpErrorResponse)=>{
            console.log(error.name + ' ' + error.message);
        });
        return this.pocetnaStrana.asObservable();
    }



   
    public addFlashcard(flashcard:Flashcard):void{
        this.httpClient.post(this.flashcardsURL,flashcard).subscribe();
    }


    public deleteFlashcard(id:number):void{
        this.httpClient.delete(this.flashcardsURL + id).subscribe();
    }

    public updateFlashcard(flashcard:Flashcard):void{
        this.httpClient.put(this.flashcardsURL + flashcard.id, flashcard).subscribe();
    }




    public getOne(id:number):Observable<Flashcard>{
        return this.httpClient.get<Flashcard>(this.flashcardsURL + id);
    }



    naslov:string;

    gdesam:string;
    
    public getGdeSam(){
        return this.gdesam;
    }

    public setGdeSam(gdesam:string){
        this.gdesam = gdesam;
    }


    public getNaslov(){
        return this.naslov;
    }

    public setNaslov(naslov:string){
        this.naslov = naslov;
    }


  



    constructor (private httpClient:HttpClient){}


}