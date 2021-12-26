import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomFormError } from 'src/app/models/entities/custom-form-error.entity';
import { IUserLogin } from 'src/app/models/interfaces/user-login.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public hide: boolean;
  public user: IUserLogin;

  public loginFailure: boolean;
  public customError: CustomFormError;

  @Output() classLoginEmitter: EventEmitter<string>;
  @Output() newUserEmitter: EventEmitter<boolean>;
  @Output() changeLoginVisibleEmitter: EventEmitter<boolean>;

  constructor(public userService: UserService) {
    this.hide = false;
    this.user = {
      name: '',
      password: ''
    }
    this.loginFailure = false;

    this.customError = new CustomFormError();
    this.classLoginEmitter = new EventEmitter();
    this.newUserEmitter = new EventEmitter();
    this.changeLoginVisibleEmitter = new EventEmitter();
  }

  ngOnInit(): void {
    const fsDoc = <any>document;

    if (!this.isFullScreen()) {
      const fsDocElem = <any>document.documentElement;

      if (fsDocElem.requestFullscreen)
        fsDocElem.requestFullscreen();
      else if (fsDocElem.msRequestFullscreen)
        fsDocElem.msRequestFullscreen();
      else if (fsDocElem.mozRequestFullScreen)
        fsDocElem.mozRequestFullScreen();
      else if (fsDocElem.webkitRequestFullscreen)
        fsDocElem.webkitRequestFullscreen();
    }
    else if (fsDoc.exitFullscreen)
      fsDoc.exitFullscreen();
    else if (fsDoc.msExitFullscreen)
      fsDoc.msExitFullscreen();
    else if (fsDoc.mozCancelFullScreen)
      fsDoc.mozCancelFullScreen();
    else if (fsDoc.webkitExitFullscreen)
      fsDoc.webkitExitFullscreen();
  }

  public isFullScreen(): boolean {
    const fsDoc = <any> document;
  
    return !!(fsDoc.fullscreenElement || fsDoc.mozFullScreenElement || fsDoc.webkitFullscreenElement || fsDoc.msFullscreenElement);
  }

  public login() {
    this.changeLoginVisibleEmitter.emit();

    let subscription = this.userService.login(this.user).subscribe(
      (isAutorize) => {
        if (isAutorize) {
          this.classLoginEmitter.emit('end-loading');
        } else {
          this.loginFailure = true;
          this.customError.showError = this.loginFailure;
          this.changeLoginVisibleEmitter.emit();
        }
        subscription.unsubscribe();
      }
    );
  }

  public newUser() {
    this.newUserEmitter.emit();
  }

  public modelChange() {
    this.loginFailure = false;
    this.customError.showError = this.loginFailure;
  }


}
