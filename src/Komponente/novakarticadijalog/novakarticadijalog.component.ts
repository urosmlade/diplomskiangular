import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FlashcardService } from 'src/Service/flashcard.service';
import { Flashcard } from 'src/Model/flashcard.model';
import { KorisnikService } from 'src/Service/korisnik.service';
import { Kategorija } from 'src/Model/kategorija.model';
import { Observable } from 'rxjs';
import { Korisnik } from 'src/Model/korisnik.model';
import { UserService } from 'src/Service/user.service';
import { KategorijaService } from 'src/Service/Kategorija.service';
import { UsernameService } from 'src/Service/username.service';

@Component({
  selector: 'app-novakarticadijalog',
  templateUrl: './novakarticadijalog.component.html',
  styleUrls: ['./novakarticadijalog.component.css']
})
export class NovakarticadijalogComponent implements OnInit {

  filteredOptions: Observable<Kategorija[]>;
  
  kategorije:Kategorija[];
  korisnik:Korisnik;
  privatno:boolean;

  public flag:number;
  
  
  constructor(public dialogRef:MatDialogRef<NovakarticadijalogComponent>,
              public flashcardService:FlashcardService,
              @Inject (MAT_DIALOG_DATA) public flashcard:Flashcard,
              public snackBar:MatSnackBar,
              public korisnikService:KorisnikService,
              public userService:UserService,
              public kategorijaService:KategorijaService,
              private usernameService:UsernameService) { }

    ngOnInit() {
      this.kategorijaService.getDrugaKolonaSve().subscribe(data=>{
          this.kategorije = data;
    });

    

    this.userService.getOne(this.usernameService.decrypt()).subscribe(data=>{
       this.korisnik = data;
    });
  }


  public checkbox(){
    this.flashcard.korisnik = this.korisnik;
    this.flashcardService.updateFlashcard(this.flashcard);
    this.snackBar.open("Promenili ste privatnost kartice","U redu",{duration:2000});
  }
  

  public add():void{

  if(this.flag == 1){
    this.flashcard.korisnik = this.korisnik;
    this.flashcardService.updateFlashcard(this.flashcard);
    this.snackBar.open("Modifikovali ste  karticu","U redu",{duration:2000});
    this.dialogRef.close();

  }
  else{    
    if(this.flashcard.pitanje == null || this.flashcard.odgovor == null || this.flashcard.kategorijaBean == null){
      this.snackBar.open("Morate popuniti sva polja", "U redu", {duration:2000,});
    }else{
    this.flashcard.korisnik = this.korisnik;
    if(this.privatno == true){
      this.flashcard.privatno = true;
    }else{
      this.flashcard.privatno = false;
    }
      this.flashcardService.addFlashcard(this.flashcard);
      this.snackBar.open("Uspesno ste napravili karticu", "U redu", {duration:2000,});
      this.dialogRef.close();

  }
  }

}
}
