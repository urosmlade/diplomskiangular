export class SignUpInfo {
    name: string;
    prezime:string;
    username: string;
    email: string;
    password: string;

    constructor(name: string, prezime:string, username: string, email: string, password: string) {
        this.name = name;
        this.prezime = prezime;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
