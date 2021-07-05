import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PATHS } from 'src/app/config';
import { Test1InteconectProvider } from 'src/app/providers/test1-inteconect.provider';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public test1Var: string;
  
  private test1ProviderSubscription: Subscription;
  
  constructor(
    private test1Provider: Test1InteconectProvider,
    private router: Router
  ) {
    this.test1Var = '';
    this.test1ProviderSubscription = new Subscription();
  }
  
  ngOnInit(): void {
    this.test1();
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

  public goTo(code: number) {
    this.router.navigateByUrl(PATHS.OS);
  }
  
  ngOnDestroy(): void {
    this.test1ProviderSubscription.unsubscribe();
  }
}
