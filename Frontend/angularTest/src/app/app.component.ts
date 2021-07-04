import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Test1InteconectProvider } from './providers/test1-inteconect.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:  [ Test1InteconectProvider ]
})
export class AppComponent implements OnInit, OnDestroy {
  
  public title: string;
  public test1Var: string;
  
  private observer: Subscription;

  constructor(private provider: Test1InteconectProvider) {
    this.title = 'angularTest';
    this.test1Var = '';
    this.observer = new Subscription();
  }
  


  ngOnInit(): void {
    this.observer =  this.provider.test1GetData().subscribe(
      (ok) => {
        this.test1Var = ok.data;
        console.log('test1GetData request successful', ok);
      },
      (ko) => {
        console.error('test1GetData request fail', ko);
      }
    );
  }

  ngOnDestroy(): void {
    this.observer.unsubscribe();
  }
}
