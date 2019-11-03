import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlashcardService } from 'src/Service/flashcard.service';
import { MatDialog, MatSidenav } from '@angular/material';
import { NovakarticadijalogComponent } from 'src/Komponente/novakarticadijalog/novakarticadijalog.component';
import { Flashcard } from 'src/Model/flashcard.model';
import { ReglogComponent } from 'src/Komponente/reglog/reglog.component';
import { Router} from '@angular/router';
import { LoginComponent } from 'src/Komponente/login/login.component';
import { Kategorija } from 'src/Model/kategorija.model';
import { Korisnik } from 'src/Model/korisnik.model';
import { KorisnikService } from 'src/Service/korisnik.service';
import { KategorijaService } from 'src/Service/Kategorija.service';
import { UsernameService } from 'src/Service/username.service';
import { UserService } from '../Service/user.service';
import { PocetnaComponent } from 'src/Komponente/pocetna/pocetna.component';
import { SideNavService } from 'src/Service/sidenav.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {



  constructor(public korisnik:Korisnik, 
              public httpClient:HttpClient, 
              public flashcardService:FlashcardService, 
              public dialog:MatDialog, 
              public reglog:ReglogComponent, 
              private router:Router, 
              public login:LoginComponent,
              private korisnikService:KorisnikService,
              public kategorijaService:KategorijaService,
              private usernameService:UsernameService,
              private userService:UserService,
              private kategorija:Kategorija,
              public pocetna:PocetnaComponent,
              private sideNavService: SideNavService){
                
              }
    
              

clickMenu() { 
  this.sideNavService.toggle();
}


postaviNaslov(naslov:string){
  this.flashcardService.setNaslov(naslov);
}


public postKategorija(){
  this.korisnikService.korisnikKategorijaPostavi(this.kategorija);
}


public brisiKategorija(){
  this.korisnikService.korisnikKategorijaObrisi();
}



  ngOnInit(){
  }
 





public openDialog(){
  const dialogRef = this.dialog.open(NovakarticadijalogComponent,{data:{}});
  
  dialogRef.afterClosed().subscribe(result=>{
      
    const naziv = this.flashcardService.getGdeSam();
    if(naziv == "Pocetna strana"){
      this.pocetna.pocetnastrana();
    }

    if(naziv == "Korisnik:" && this.userService.getPisac() == this.usernameService.decrypt()){
      this.pocetna.flashcardsProfilKorisnikaPrivatnoIJavno(this.usernameService.decrypt());      
    }

    if(naziv=="Kategorija:"){
      this.pocetna.ucitajFlashcardsPoKategoriji();
    }
  })
}
}

