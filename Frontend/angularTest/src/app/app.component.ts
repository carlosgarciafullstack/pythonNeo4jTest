import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Test1InteconectProvider } from './providers/test1-inteconect.provider';
import { Task } from 'src/app/models/entities/task.entity';
import { SystemDataProvider } from './providers/system-data.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:  [ Test1InteconectProvider ]
})
export class AppComponent implements OnInit, OnDestroy {
  
  public title: string;
  public test1Var: string;
  public programs: Task[];
  
  private test1ProviderSubscription: Subscription;
  private systemProviderSubscription: Subscription;

  constructor(
    private test1Provider: Test1InteconectProvider,
    private systemProvider: SystemDataProvider
  ) {
    this.title = 'angularTest';
    this.test1Var = '';
    this.test1ProviderSubscription = new Subscription();
    this.systemProviderSubscription = new Subscription();
    this.programs = [];
  }
  
  ngOnInit(): void {
    this.test1();
    this.loadProgramData();
  }

  public test1() {
    this.test1ProviderSubscription =  this.test1Provider.test1GetData().subscribe(
      (ok) => {
        this.test1Var = ok.data;
        console.log('test1GetData request successful', ok);
      },
      (ko) => {
        console.error('test1GetData request fail', ko);
      }
    );
  }

  public loadProgramData() {
    this.test1ProviderSubscription =  this.systemProvider.loadPrograms().subscribe(
      (response) => {
        this.programs = response.programs;
        console.log('test1GetData request successful', response);
      },
      (error) => {
        console.error('test1GetData request fail', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.test1ProviderSubscription.unsubscribe();
    this.systemProviderSubscription.unsubscribe();
  }
}
