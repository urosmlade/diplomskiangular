import { Component, OnInit, Output } from '@angular/core';
import { Flashcard } from 'src/Model/flashcard.model';
import { FlashcardService } from 'src/Service/flashcard.service';
import { OdgovorDijalogComponent } from '../odgovor-dijalog/odgovor-dijalog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Kategorija } from 'src/Model/kategorija.model';
import { Korisnik } from 'src/Model/korisnik.model';
import { KategorijaService } from 'src/Service/Kategorija.service';
import { UserService } from 'src/Service/user.service';
import { KorisnikService } from 'src/Service/korisnik.service';
import { LoginComponent } from '../login/login.component';
import { UsernameService } from 'src/Service/username.service';
import { NovakarticadijalogComponent } from '../novakarticadijalog/novakarticadijalog.component';
import { PotvrdadijalogComponent } from '../potvrdadijalog/potvrdadijalog.component';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  flashcards : Flashcard[];
  kategorije : Kategorija[];
  brojKartica:Number;
  staprikazati:Boolean;
  naziv:string;
  prvakolona : Kategorija[];
  drugakolona : Kategorija[];
  i:number;
  korisnikKategorija:Korisnik[];
  svikorisnici:Korisnik[];

  kategorijaa:Kategorija[];


  constructor(private userService:UserService,
              public korisnik:Korisnik,
              private flashcardService:FlashcardService, 
              public dialog:MatDialog,
              public router:Router, 
              public kategorijaService:KategorijaService,
              private korisnikService:KorisnikService,
              public login:LoginComponent,
              private usernameService:UsernameService,
              private kategorija:Kategorija,
              private snackBar:MatSnackBar,
              private flashcard:Flashcard
              ) { 
                this.flashcardService.setGdeSam("Pocetna strana");
                this.userService.setPisac(null);
                this.kategorijaService.setKategorija(null);
              }


lajk:string;




public hoveredElement:any;

toggleHover(id) {
  this.hoveredElement = id
}

removeHover() {
  this.hoveredElement = null;
}



ngOnInit() {

  this.ucitajKorisnika(this.usernameService.decrypt());
  this.pocetnastrana();
  this.ucitajKategorijeZaKorisnika();

}


//prebaci u app dodaj da se pamti





pocetnastrana(){
  this.kategorijaService.setKategorija(null);
  this.loadPocetnaStrana();
  this.userService.setPisac(null);
  this.flashcardService.setGdeSam('Pocetna strana');
}



loadPocetnaStrana(){
  this.flashcardService.flashcardsPocetnaStranaSamoJavnoS().subscribe(data=>{
    this.flashcards = data;
  })

  this.kategorijaService.getDrugaKolonaSve().subscribe(data=>{
    this.prvakolona = data;
  });



  this.korisnikService.getAllKorisnik().subscribe(data=>{
    this.svikorisnici = data;
  });
  this.staprikazati = true;
}



public ucitajKorisnika(username:String){
  this.userService.getOne(username).subscribe(data=>{
    this.korisnik = data;
    this.korisnikService.setEmail(this.korisnik.email);
  });
}


mojprofil(){
  this.flashcardService.setGdeSam('Korisnik:');
  this.userService.setPisac(this.usernameService.decrypt());
  this.kategorijaService.setKategorija(null);
  this.flashcardsProfilKorisnikaPrivatnoIJavno(this.usernameService.decrypt());
}


public flashcardsProfilKorisnikaPrivatnoIJavno(autor:string){
  this.flashcardService.flashcardsProfilKorisnikaPrivatnoIJavnoS(autor).subscribe(data=>{
    this.flashcards = data;
    this.brojKartica= this.flashcards.length;
  });
  this.staprikazati = false;
}



logout(){
  this.usernameService.setUsername(null);
  this.login.isLoggedIn = false;
  this.router.navigate(['/login']);
  window.sessionStorage.clear();
}


















kategorijaMetoda(nazivkategorije:HTMLParagraphElement){
  const naziv = nazivkategorije.textContent;
  this.kategorijaService.setKategorija(naziv);
  this.userService.setPisac(null);
  //this.ucitajDruguKolonu();
  this.flashcardService.setGdeSam('Kategorija:')
}

/*
public ucitajDruguKolonu(){
  this.kategorijaService.getDrugaKolona(document.getElementById('Id'+this.i).textContent).subscribe(data=>{
    this.drugakolona = data;
  });
}*/



public ucitajFlashcardsPoKategoriji(){
  this.flashcardService.flashcardsPoKategorijiS(this.kategorijaService.getKategorija()).subscribe(data=>{
    this.flashcards = data;
  });


  this.korisnikService.getAllUserByKategorija(this.kategorijaService.getKategorija()).subscribe(data=>{
    this.korisnikKategorija = data;
  });
  
}



ucitajKategorijeZaKorisnika(){
  this.korisnikService.getKategorijaByUser().subscribe(data=>{
    this.kategorijaa = data;
   
  })
}




public postKategorija(){
  this.korisnikService.korisnikKategorijaPostavi(this.kategorija);
  this.snackBar.open("Zapratili ste kategoriju "+this.kategorijaService.getKategorija(),"U redu", {duration:2500});
}


public brisiKategorija(){
  this.korisnikService.korisnikKategorijaObrisi();
  this.snackBar.open("Otpratili ste kategoriju "+this.kategorijaService.getKategorija(),"U redu", {duration:2500});

}






setId(i:number){
  this.i = i;
}





loadOne(id:number){
  this.openDialog(this.flashcards[id].id,this.flashcards[id].pitanje,this.flashcards[id].odgovor, this.flashcards[id].kategorijaBean, this.flashcards[id].korisnik, this.flashcards[id].privatno);
}

 openDialog(id:number, pitanje:string, odgovor:string, kategorijaBean:Kategorija, korisnik:Korisnik, privatno:boolean){
 const dialogRef = this.dialog.open(OdgovorDijalogComponent, {data:{id:id,pitanje:pitanje, odgovor:odgovor, kategorijaBean:kategorijaBean, korisnik:korisnik, privatno:privatno}});
  
 dialogRef.afterClosed().subscribe(result=>{
  const naziv = this.flashcardService.getGdeSam();
  
 if(naziv == "Pocetna strana"){
    this.pocetnastrana();
  }

  if(naziv == "Korisnik:" && this.usernameService.decrypt() == this.userService.getPisac()){
    this.flashcardsProfilKorisnikaPrivatnoIJavno(this.usernameService.decrypt());      
  }

  if(naziv == "Kategorija:"){
    this.ucitajFlashcardsPoKategoriji();
  }

})
}



tudjiprofil(pisac:HTMLParagraphElement){
  const pisactext = pisac.textContent;
  this.flashcardService.setGdeSam('Korisnik:');
  this.userService.setPisac(pisactext);
  this.kategorijaService.setKategorija(null);
  this.ucitajPrivatnoZaKorisnika(pisactext);
}

public ucitajPrivatnoZaKorisnika(autor:String){
  this.flashcardService.flashcardsSamoPrivatneDrugogKorisnikaS(autor).subscribe(data=>{
    this.flashcards = data;
    this.brojKartica= this.flashcards.length;
  });
}



public pretragaKorisnikaSearchBar(){
  this.korisnikService.getAllLajk(this.lajk).subscribe(data=>{
    this.svikorisnici = data;
  });
}


seci(str:string):String{

  if(str.length>50){
    return (str.substring(0,50)+"...");
  }
  else{
    return str;
  }
}



ucitajeditdijalog(id:number){
  this.editDijalog(1,this.flashcards[id].id,this.flashcards[id].pitanje,this.flashcards[id].odgovor, this.flashcards[id].kategorijaBean, this.flashcards[id].korisnik, this.flashcards[id].privatno);
}



editDijalog(flag:number,id:number, pitanje:string, odgovor:string, kategorijaBean:Kategorija, korisnik:Korisnik, privatno:boolean){

const editDijalog = this.dialog.open(NovakarticadijalogComponent,{data:{id:id, pitanje:pitanje,odgovor:odgovor, kategorijaBean:kategorijaBean, privatno:privatno}});

editDijalog.componentInstance.flag =1;

editDijalog.afterClosed().subscribe(result=>{
  const naziv = this.flashcardService.getGdeSam();
  
 if(naziv == "Pocetna strana"){
    this.pocetnastrana();
  }

  if(naziv == "Korisnik:" && this.usernameService.decrypt() == this.userService.getPisac()){
    this.flashcardsProfilKorisnikaPrivatnoIJavno(this.usernameService.decrypt());      
  }

  if(naziv == "Kategorija:"){
    this.ucitajFlashcardsPoKategoriji();
  }

})
}



brisanjeDijalog(id:number, pitanje:string){

  const brisanjeDijalog = this.dialog.open(PotvrdadijalogComponent,{data:{id:id, pitanje:pitanje}});
  
  
  brisanjeDijalog.afterClosed().subscribe(result=>{
    const naziv = this.flashcardService.getGdeSam();
    
   if(naziv == "Pocetna strana"){
      this.pocetnastrana();
    }
  
    if(naziv == "Korisnik:" && this.usernameService.decrypt() == this.userService.getPisac()){
      this.flashcardsProfilKorisnikaPrivatnoIJavno(this.usernameService.decrypt());      
    }
  
    if(naziv == "Kategorija:"){
      this.ucitajFlashcardsPoKategoriji();
    }
  
  })
  }
  
  














}
