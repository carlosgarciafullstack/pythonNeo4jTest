import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Test1InteconectProvider } from './providers/test1-inteconect.provider';
import { Task } from 'src/app/models/entities/task.entity';

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
  
  private observer: Subscription;

  constructor(private provider: Test1InteconectProvider) {
    this.title = 'angularTest';
    this.test1Var = '';
    this.observer = new Subscription();
    this.programs = [
      new Task(1,'Home', 'home'),
      new Task(2,'Device Unknown', 'device_unknown'),
      new Task(3,'Input', 'input'),
      new Task(4,'Functions', 'functions'),
      new Task(5,'Launch', 'launch'),
      new Task(6,'Help', 'help')
    ];
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
