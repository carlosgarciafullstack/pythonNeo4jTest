import { Component, OnInit } from '@angular/core';
import { CustomFormError } from 'src/app/models/entities/custom-form-error.entity';
import { IUserLogin } from 'src/app/models/interfaces/user-login.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-finder-os',
  templateUrl: './view-finder-os.component.html',
  styleUrls: ['./view-finder-os.component.scss']
})
export class ViewFinderOSComponent implements OnInit {

  public hide = true;
  public user: IUserLogin;
  public classLogin: string;
  public loginIsVisible: boolean;
  public loginFailure: boolean;
  public customError: CustomFormError;
  
  constructor(public userService: UserService) { 
    this.user = {
      name: '',
      password: ''
    }
    this.classLogin = '';
    this.loginFailure = false;
    this.loginIsVisible = true;
    this.customError = new CustomFormError();
  }

  ngOnInit(): void {}

  public login() {
    this.loginIsVisible = false;

    let subscription = this.userService.login(this.user).subscribe(
      (isAutorize) => {
        if (isAutorize) {
          this.classLogin = 'end-loading'
          setTimeout(()=> this.classLogin = 'end-animation', 1100);
        } else {
          this.loginFailure = true;
          this.customError.showError = this.loginFailure;
          this.loginIsVisible = true;
        }
        subscription.unsubscribe();
      }
    );
  }

  public modelChange() {
    this.loginFailure = false;
    this.customError.showError = this.loginFailure;
  }

}
