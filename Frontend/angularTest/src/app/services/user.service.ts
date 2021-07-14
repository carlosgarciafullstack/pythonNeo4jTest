import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { IUserLogin } from "../models/interfaces/user-login.interface";
import { SystemDataProvider } from "../providers/system-data.provider";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user!: IUserLogin;
  public isAutorize: boolean;
  public subject: Subject<boolean>;

  constructor(public provider: SystemDataProvider) {
    this.isAutorize = false;
    this.subject = new Subject<boolean>();
  }

  public login(user: IUserLogin): Subject<boolean> {
    let subscription = this.provider.login(user).subscribe(
      (response) => {

        this.isAutorize = true;
        this.subject.next(this.isAutorize);
        console.log('login request successful', response);
      },
      (error) => {

        this.subject.next(this.isAutorize);
        console.error('login request fail', error);
      },
      () => {
        subscription.unsubscribe();
      }
    );
    return this.subject;
  }

}