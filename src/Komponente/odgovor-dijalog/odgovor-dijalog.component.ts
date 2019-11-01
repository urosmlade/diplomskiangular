import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FlashcardService } from 'src/Service/flashcard.service';
import { Flashcard } from 'src/Model/flashcard.model';
import { UserService } from 'src/Service/user.service';
import { Router } from '@angular/router';
import { UsernameService } from 'src/Service/username.service';
import { KategorijaService } from 'src/Service/Kategorija.service';
import { PocetnaComponent } from '../pocetna/pocetna.component';
import { Korisnik } from 'src/Model/korisnik.model';


@Component({
  selector: 'app-odgovor-dijalog',
  templateUrl: './odgovor-dijalog.component.html',
  styleUrls: ['./odgovor-dijalog.component.css']
})
export class OdgovorDijalogComponent implements OnInit {

obrisitrue:boolean = false;
korisnik:Korisnik;

  constructor(public dialogRef:MatDialogRef<OdgovorDijalogComponent>,
              public userService:UserService,
              @Inject (MAT_DIALOG_DATA) public data:Flashcard,
              public router:Router,
              public flashcardService:FlashcardService,
              public usernameService:UsernameService,
              public kategorijaService:KategorijaService,
              //public pocetna:PocetnaComponent
              private snackBar:MatSnackBar,
              ) { }

public deleteFlashcard(id:number){
    this.flashcardService.deleteFlashcard(id);
    this.snackBar.open("Obrisali ste karticu","U redu", {duration:2000});
    this.dialogRef.close();
}




obrisi(){
  this.obrisitrue = true;
}

public checkbox(){

  this.data.korisnik = this.korisnik;
  this.data.privatno = !this.data.privatno;
}



  ngOnInit() {
  
    this.userService.getOne(this.usernameService.decrypt()).subscribe(korisnik=>{
      this.korisnik = korisnik;
   });
   
  }
  
  flashcards : Flashcard[];

  public loadAutor(username:string){
    this.userService.getOne(username);
  }



  tudjiprofil(naziv:HTMLParagraphElement){
    const username = naziv.textContent;
    if(username != this.usernameService.decrypt()){
    this.flashcardService.setGdeSam('Korisnik:');
    this.userService.setPisac(username);
    this.kategorijaService.setKategorija(null);
    this.loadCards(username);
    }
  }

  public loadCards(autor:String){
    this.flashcardService.flashcardsSamoPrivatneDrugogKorisnikaS(autor).subscribe(data=>{
      this.flashcards = data;
    });
  }
}
