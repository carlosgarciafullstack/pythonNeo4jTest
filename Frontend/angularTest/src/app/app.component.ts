import { Component } from '@angular/core';
import { Test1InteconectProvider } from './providers/test1-inteconect.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Test1InteconectProvider]
})
export class AppComponent {

  public title: string;
  
  constructor() {
    this.title = 'angularTest';
  }
}
