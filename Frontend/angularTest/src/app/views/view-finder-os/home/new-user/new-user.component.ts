import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomFormError } from '@core/models/entities/custom-form-error.entity';
import { INewUser } from '@core/models/interfaces/new-user.interface';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  public newUserFailure: boolean;
  public passwordEmptyError: boolean;
  public distintPasswordError: boolean;
  public passwordEmpty2Error: boolean;
  public user: INewUser;
  public customError: CustomFormError;
  public passwordError: CustomFormError;
  @Output() changeLoginVisibleEmitter: EventEmitter<boolean>;
  @Output() newUserEmitter: EventEmitter<boolean>;
  

  constructor(public userService: UserService) { 
    this.newUserFailure = false;
    this.passwordEmptyError = false;
    this.distintPasswordError = false;
    this.passwordEmpty2Error = false;
    this.user = {
      name: '',
      password: '',
      password2: ''
    }
    this.customError = new CustomFormError();
    this.passwordError = new CustomFormError();
    this.changeLoginVisibleEmitter = new EventEmitter();
    this.newUserEmitter = new EventEmitter();
    
  }

  ngOnInit(): void {}

  public back() {
    this.newUserEmitter.emit();
  }

  public newUser() {
    this.changeLoginVisibleEmitter.emit();
    if(this.validate()) {
      let subscription = this.userService.newUser(this.user).subscribe(
        (isCreated) => {
          if (isCreated) {
            this.newUserEmitter.emit();
          } else {
            this.newUserFailure = true;
            this.customError.showError = this.newUserFailure;
          }
          this.changeLoginVisibleEmitter.emit();
          subscription.unsubscribe();
        },
        (err) => console.log("ERROR",err)
      );
    } else {
      this.changeLoginVisibleEmitter.emit();
      this.newUserFailure = true;
      this.passwordError.showError = this.newUserFailure;
    }
    
  }

  public modelChange() {
    this.newUserFailure = false;
    this.distintPasswordError = false;
    this.passwordEmptyError = false;
    this.passwordEmpty2Error = false;
    this.customError.showError = false;
    this.passwordError.showError = false;
  }

  private validate() {
    let isValid = true;
    if(this.user.password == '') {
      this.passwordEmptyError = true;
      this.passwordError.showError = this.passwordEmptyError;
      isValid = false;
    } else if(this.user.password2 == '') {
      this.passwordEmpty2Error = true;
      this.passwordError.showError = this.passwordEmpty2Error;
      isValid = false;
    }else if(this.user.password != this.user.password2) {
      this.distintPasswordError = true;
      this.passwordError.showError = this.distintPasswordError;
      isValid = false;
    }
    

    return isValid;
  }
}
