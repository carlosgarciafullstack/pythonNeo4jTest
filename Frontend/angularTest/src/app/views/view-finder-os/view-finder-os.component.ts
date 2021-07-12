import { Component, OnInit } from '@angular/core';
import { SystemDataProvider } from 'src/app/providers/system-data.provider';

@Component({
  selector: 'app-view-finder-os',
  templateUrl: './view-finder-os.component.html',
  styleUrls: ['./view-finder-os.component.scss']
})
export class ViewFinderOSComponent implements OnInit {

  public hide = true;
  public user: any;
  public classLogin: string;
  public loginIsVisible: boolean;
  
  constructor(public systemProvider: SystemDataProvider) { 
    this.user = {
      name: '',
      password: ''
    }
    this.classLogin = '';
    this.loginIsVisible = true;
  }

  ngOnInit(): void {}

  public login() {
    this.loginIsVisible = false;
    let subscription = this.systemProvider.login(this.user).subscribe(
      (response) => {
        
        this.classLogin = 'end-loading'
        setTimeout(()=> this.classLogin = 'end-animation', 1100);
        console.log('login request successful', response);
      },
      (error) => {
        console.error('login request fail', error);
        this.loginIsVisible = true;
      },
      () => {
        subscription.unsubscribe();
      }
    );

  }

}
