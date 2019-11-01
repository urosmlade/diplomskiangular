import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReglogComponent } from 'src/Komponente/reglog/reglog.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import { PocetnaComponent } from '../Komponente/pocetna/pocetna.component';
import {RouterModule, Routes}  from '@angular/router';
import { FlashcardService } from 'src/Service/flashcard.service';
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import { OdgovorDijalogComponent } from '../Komponente/odgovor-dijalog/odgovor-dijalog.component';
import { MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TextFieldModule} from '@angular/cdk/text-field';
import { NovakarticadijalogComponent } from '../Komponente/novakarticadijalog/novakarticadijalog.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { KorisnikService } from 'src/Service/korisnik.service';
import { Korisnik } from 'src/Model/korisnik.model';
import { LoginComponent } from '../Komponente/login/login.component';
import {MatListModule} from '@angular/material/list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Flashcard } from 'src/Model/flashcard.model';
import {MatTableModule} from '@angular/material/table';
import { KategorijaService } from 'src/Service/Kategorija.service';
import { Kategorija } from 'src/Model/kategorija.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';
import 'hammerjs';
import { UsernameService } from 'src/Service/username.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { PotvrdadijalogComponent } from '../Komponente/potvrdadijalog/potvrdadijalog.component';

const Routes = [{path : 'register', component : ReglogComponent},
                {path: 'pocetna', component:PocetnaComponent},
                {path:'login', component:LoginComponent},
                {path:'',component:LoginComponent}]


@NgModule({
  declarations: [
    AppComponent,
    ReglogComponent,
    PocetnaComponent,
    OdgovorDijalogComponent,
    NovakarticadijalogComponent,
    LoginComponent,
    PotvrdadijalogComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatToolbarModule,
    RouterModule.forRoot(Routes),
    HttpClientModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    TextFieldModule,
    MatDividerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatListModule,
    MatAutocompleteModule,
    MatSelectModule,
    ScrollingModule,
    MatIconModule,
    MatCheckboxModule,
    MatTableModule,
    MatProgressBarModule, 
    MatRadioModule,
    MatTooltipModule,
    MatTreeModule,
    MatExpansionModule,
    MatSidenavModule,
    MatSlideToggleModule
    ],
  entryComponents:[PotvrdadijalogComponent,OdgovorDijalogComponent, NovakarticadijalogComponent, ReglogComponent],

  providers:  [UsernameService, PocetnaComponent,Kategorija,FlashcardService, KorisnikService, Korisnik, ReglogComponent, LoginComponent, Flashcard, KategorijaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
