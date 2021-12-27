import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
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
    private translateService: TranslateService,
    private test1Provider: Test1InteconectProvider,
    private router: Router
  ) {
    this.test1Var = '';
    this.test1ProviderSubscription = new Subscription();
    
  }
  
  ngOnInit(): void {
    this.test1();
    this.translateService.setDefaultLang('en');
  }

  public test1() {
    this.test1ProviderSubscription =  this.test1Provider.test1GetData().subscribe(
      (ok) => {
        this.test1Var = ok.data;
        console.log('test1GetData request successful', this.test1Var);
      },
      (ko) => {
        this.test1Var = 'backend.Error';
        console.error('test1GetData request fail', ko);
      }
    );
  }

  public goTo(code: number) {
    switch (code) {
      case 1:
        this.router.navigateByUrl(PATHS.OS);
        break;
      case 2:
        this.router.navigateByUrl(PATHS.MAP);
        break;
      default:
        this.router.navigateByUrl(PATHS.OS);
        break;
    }
  }
  
  public change(lang: string) {
    this.translateService.setDefaultLang(lang);
  }

  ngOnDestroy(): void {
    this.test1ProviderSubscription.unsubscribe();
  }
}
