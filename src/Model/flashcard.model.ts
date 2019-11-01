import { Kategorija } from './kategorija.model';
import { Korisnik } from './korisnik.model';

export class Flashcard{
    id:number;
    pitanje:string;
    odgovor:string;
    kategorijaBean:Kategorija;
    korisnik:Korisnik;
    privatno:boolean;
}

