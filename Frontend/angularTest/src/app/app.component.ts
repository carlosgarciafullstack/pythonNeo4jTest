import { Component } from '@angular/core';
import { Test1InteconectProvider } from './providers/test1-inteconect.provider';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Test1InteconectProvider]
})
export class AppComponent {

  public title: string;
  
  constructor(private translate: TranslateService) {
    this.title = 'angularTest';
    translate.setDefaultLang('en');
  }
}
