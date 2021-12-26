import { Injectable } from "@angular/core";
import { INewUser } from "@core/models/interfaces/new-user.interface";
import { Subject } from "rxjs";
import { User } from "../models/entities/user.entity";
import { IUserConfig } from "../models/interfaces/user-config.interface";
import { IUserLogin } from "../models/interfaces/user-login.interface";
import { SystemDataProvider } from "../providers/system-data.provider";
import { BackgroundService } from "./background.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user!: User;
  public isAutorize: boolean;
  public loginSubject: Subject<boolean>;
  public newUserSubject: Subject<boolean>;

  public userConfig!: IUserConfig;

  constructor(
    public provider: SystemDataProvider,
    public backgroundService: BackgroundService
  ) {
    this.isAutorize = false;
    this.loginSubject = new Subject<boolean>();
    this.newUserSubject = new Subject<boolean>();
  }

  public login(user: IUserLogin): Subject<boolean> {
    let subscription = this.provider.login(user).subscribe(
      (response) => {
        this.user = response.data;
        this.isAutorize = true;
        this.getUserConfig();
        console.log('login request successful', response);
      },
      (error) => {

        this.loginSubject.next(this.isAutorize);
        console.error('login request fail', error);
      },
      () => {
        subscription.unsubscribe();
      }
    );
    return this.loginSubject;
  }

  public newUser(user: INewUser): Subject<boolean> {
    let subscription = this.provider.newUser(user).subscribe(
      (response) => {
        if(response.success){
          this.newUserSubject.next(true);
          console.log('new User ok', response.message);
        } else {
          this.newUserSubject.next(false);
          console.log('Name user in use', response.message);
        }
      },
      (error) => {
        console.error('new User request fail', error);
        this.newUserSubject.next(false);
      },
      () => {
        subscription.unsubscribe();
      }
    );
    return this.newUserSubject;
  }

  private getUserConfig(): void {
    let subscription = this.provider.getUserConfig().subscribe(
      (response) => {
        if (response.success) {
          this.userConfig = response.data;
          this.backgroundService.setBackground(Number(this.userConfig.background));
          this.backgroundService.changeBackgroundSetting(this.userConfig.classCssBackground);
        }
        
        this.loginSubject.next(this.isAutorize);
        console.log('userConfig request successful', response);
      },
      (error) => {
        this.loginSubject.next(this.isAutorize);
        console.error('userConfig request fail', error);
      },
      () => {
        subscription.unsubscribe();
      }
    );
  }

}