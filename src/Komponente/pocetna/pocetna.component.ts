import { Component, OnInit, ViewChild } from '@angular/core';
import { Flashcard } from 'src/Model/flashcard.model';
import { FlashcardService } from 'src/Service/flashcard.service';
import { OdgovorDijalogComponent } from '../odgovor-dijalog/odgovor-dijalog.component';
import { MatDialog, MatSnackBar, MatSidenav } from '@angular/material';
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
import { SideNavService } from 'src/Service/sidenav.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})

export class PocetnaComponent implements OnInit {

  kategorije: Kategorija[];
  i: number;
  korisnikKategorija: Korisnik[];
  svikorisnici: Korisnik[];
  kategorijaa: Kategorija[];
  sidenavprikaz: number = 0;
  lajk: string;
  mrakbroj: number = 0;
  hoveredElement: any;
  opened:boolean;



  flashcards: Flashcard[];
  brojKartica: Number;


  constructor(
      public userService: UserService,
      public korisnik: Korisnik,
      public flashcardService: FlashcardService,
      public dialog: MatDialog,
      public router: Router,
      public kategorijaService: KategorijaService,
      public korisnikService: KorisnikService,
      public login: LoginComponent,
      public usernameService: UsernameService,
      public kategorija: Kategorija,
      public snackBar: MatSnackBar,
      public sideNavService: SideNavService,
  ) {
      this.flashcardService.setGdeSam("Pocetna strana");
      this.userService.setPisac(null);
      this.kategorijaService.setKategorija(null);
  }

  public ucitajPrivatnoZaKorisnika(autor: String) {
      this.flashcardService.flashcardsSamoPrivatneDrugogKorisnikaS(autor).subscribe(data => {
          this.flashcards = data;
          this.brojKartica = this.flashcards.length;
      });
  }

  public pretragaKorisnikaSearchBar() {
      this.korisnikService.getAllLajk(this.lajk).subscribe(data => {
          this.svikorisnici = data;
      });
  }

  ngOnInit() {
      this.toggle();
      this.ucitajKorisnika(this.usernameService.decrypt());
      this.pocetnastrana();
      this.ucitajSveKategorije();
  }

  dark() {
      this.mrakbroj++;
      if (this.mrakbroj % 2 == 1) {
          this.mrak();
      } else {
          this.dan();
      }
  }

  mrak() {
      document.documentElement.style.setProperty('--color', '#081B33');
      document.documentElement.style.setProperty('--tekst', 'white');
      document.documentElement.style.setProperty('--kartica', '#2f4562');
      document.documentElement.style.setProperty('--tab', '#081B33');
  }

  dan() {
      document.documentElement.style.setProperty('--color', 'rgb(245, 245, 245)');
      document.documentElement.style.setProperty('--tekst', 'black');
      document.documentElement.style.setProperty('--kartica', 'white');
      document.documentElement.style.setProperty('--tab', 'rgb(245, 245, 245)');
  }

  toggleHover(id) {
      this.hoveredElement = id
  }

  removeHover() {
      this.hoveredElement = null;
  }

  @ViewChild('sidenav', null) public sidenav: MatSidenav;

  toggle() {
      this.sideNavService.sideNavToggleSubject.subscribe(() => {
          this.sidenav.toggle();
      });
  }

  pocetnastrana() {
      this.sidenavprikaz = 0;
      this.kategorijaService.setKategorija(null);
      this.loadPocetnaStrana();
      this.userService.setPisac(null);
      this.flashcardService.setGdeSam('Pocetna strana');
  }

  loadPocetnaStrana() {
      this.flashcardService.flashcardsPocetnaStranaSamoJavnoS().subscribe(data => {
          this.flashcards = data;
      })

      this.korisnikService.getAllKorisnik().subscribe(data => {
          this.svikorisnici = data;
      });
  }

  ucitajKorisnika(username: String) {
      this.userService.getOne(username).subscribe(data => {
          this.korisnik = data;
          this.korisnikService.setEmail(this.korisnik.email);
      });
  }

  mojprofil() {
      this.sidenavprikaz = 1;
      this.flashcardService.setGdeSam('Korisnik:');
      this.userService.setPisac(this.usernameService.decrypt());
      this.kategorijaService.setKategorija(null);
      this.flashcardsProfilKorisnikaPrivatnoIJavno(this.usernameService.decrypt());
  }

  flashcardsProfilKorisnikaPrivatnoIJavno(autor: string) {
      this.flashcardService.flashcardsProfilKorisnikaPrivatnoIJavnoS(autor).subscribe(data => {
          this.flashcards = data;
          this.brojKartica = this.flashcards.length;
      });
  }

  logout() {
      this.usernameService.setUsername(null);
      this.login.isLoggedIn = false;
      this.router.navigate(['/login']);
      window.localStorage.clear();
  }

  kategorijaprikaz() {
      this.sidenavprikaz = 2;
  }

  korisnikprikaz() {
      this.sidenavprikaz = 3;
  }

  kategorijaMetoda(nazivkategorije: HTMLParagraphElement) {
      const naziv = nazivkategorije.textContent;
      this.kategorijaService.setKategorija(naziv);
      this.userService.setPisac(null);
      this.flashcardService.setGdeSam('Kategorija:')
  }

  public ucitajSveKategorije() {
      this.kategorijaService.getAllKategorija().subscribe(data => {
          this.kategorije = data;
      });
  }

  public ucitajFlashcardsPoKategoriji() {
      this.flashcardService.flashcardsPoKategorijiS(this.kategorijaService.getKategorija()).subscribe(data => {
          this.flashcards = data;
      });

      this.korisnikService.getAllUserByKategorija(this.kategorijaService.getKategorija()).subscribe(data => {
          this.korisnikKategorija = data;
      });

  }

  ucitajKategorijeZaKorisnika() {
      this.korisnikService.getKategorijaByUser().subscribe(data => {
          this.kategorijaa = data;
      })
  }

  public postKategorija() {
      this.korisnikService.korisnikKategorijaPostavi(this.kategorija);
      this.snackBar.open("Zapratili ste kategoriju " + this.kategorijaService.getKategorija(), "U redu", {
          duration: 2500
      });
  }

  public brisiKategorija() {
      this.korisnikService.korisnikKategorijaObrisi();
      this.snackBar.open("Otpratili ste kategoriju " + this.kategorijaService.getKategorija(), "U redu", {
          duration: 2500
      });
  }

  setId(i: number) {
      this.i = i;
  }

  loadOne(id: number) {
      this.openDialog(this.flashcards[id].id, this.flashcards[id].pitanje, this.flashcards[id].odgovor, this.flashcards[id].kategorijaBean, this.flashcards[id].korisnik, this.flashcards[id].privatno);
  }

  openDialog(id: number, pitanje: string, odgovor: string, kategorijaBean: Kategorija, korisnik: Korisnik, privatno: boolean) {
      const dialogRef = this.dialog.open(OdgovorDijalogComponent, {
          data: {
              id: id,
              pitanje: pitanje,
              odgovor: odgovor,
              kategorijaBean: kategorijaBean,
              korisnik: korisnik,
              privatno: privatno
          }
      });

      dialogRef.afterClosed().subscribe(result => {
          const naziv = this.flashcardService.getGdeSam();

          if (naziv == "Pocetna strana") {
              this.pocetnastrana();
          }

          if (naziv == "Korisnik:" && this.usernameService.decrypt() == this.userService.getPisac()) {
              this.flashcardsProfilKorisnikaPrivatnoIJavno(this.usernameService.decrypt());
          }

          if (naziv == "Kategorija:") {
              this.ucitajFlashcardsPoKategoriji();
          }

      })
  }

  tudjiprofil(pisac: HTMLParagraphElement) {
      const pisactext = pisac.textContent;
      this.flashcardService.setGdeSam('Korisnik:');
      this.userService.setPisac(pisactext);
      this.kategorijaService.setKategorija(null);
      this.ucitajPrivatnoZaKorisnika(pisactext);
  }

  seci(str: string): String {

      if (str.length > 50) {
          return (str.substring(0, 50) + "...");
      } else {
          return str;
      }
  }

      ucitajeditdijalog(id: number) {
      this.editDijalog(this.flashcards[id].id, this.flashcards[id].pitanje, this.flashcards[id].odgovor, this.flashcards[id].kategorijaBean, this.flashcards[id].privatno);
  }

      editDijalog(id: number, pitanje: string, odgovor: string, kategorijaBean: Kategorija, privatno: boolean) {

      const editDijalog = this.dialog.open(NovakarticadijalogComponent, {
          data: {
              id: id,
              pitanje: pitanje,
              odgovor: odgovor,
              kategorijaBean: kategorijaBean,
              privatno: privatno
          }
      });

      editDijalog.componentInstance.flag = 1;

      editDijalog.afterClosed().subscribe(result => {
          const naziv = this.flashcardService.getGdeSam();
          console.log(naziv);
          if (naziv == "Pocetna strana") {
              this.pocetnastrana();
          }

          if (naziv == "Korisnik:" && this.usernameService.decrypt() == this.userService.getPisac()) {
              this.flashcardsProfilKorisnikaPrivatnoIJavno(this.usernameService.decrypt());
          }

          if (naziv == "Kategorija:") {
              this.ucitajFlashcardsPoKategoriji();
          }

      })
  }

      brisanjeDijalog(id: number, pitanje: string) {

      const brisanjeDijalog = this.dialog.open(PotvrdadijalogComponent, {
          data: {
              id: id,
              pitanje: pitanje
          }
      });

      brisanjeDijalog.afterClosed().subscribe(result => {
          const naziv = this.flashcardService.getGdeSam();

          if (naziv == "Pocetna strana") {
              this.pocetnastrana();
          }

          if (naziv == "Korisnik:" && this.usernameService.decrypt() == this.userService.getPisac()) {
              this.flashcardsProfilKorisnikaPrivatnoIJavno(this.usernameService.decrypt());
          }

          if (naziv == "Kategorija:") {
              this.ucitajFlashcardsPoKategoriji();
          }
      })
  }

}