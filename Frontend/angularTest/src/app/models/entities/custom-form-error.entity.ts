import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class CustomFormError implements ErrorStateMatcher {

    public showError = false;

    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      return this.showError;
    }
  }