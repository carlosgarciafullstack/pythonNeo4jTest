import { Injectable } from "@angular/core";
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

  public userConfig!: IUserConfig;

  constructor(
    public provider: SystemDataProvider,
    public backgroundService: BackgroundService
  ) {
    this.isAutorize = false;
    this.loginSubject = new Subject<boolean>();
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