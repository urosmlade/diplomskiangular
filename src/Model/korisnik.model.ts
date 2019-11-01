import { Uloga } from './uloga.model';
import { Kategorija } from './kategorija.model';

export class Korisnik{
    id:number;
    ime:string;
    prezime:string;
    username:string;
    email:string;
    password:string;
    roles:Uloga;
    kategorijas:Kategorija;
}