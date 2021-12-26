import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-view-finder-os',
  templateUrl: './view-finder-os.component.html',
  styleUrls: ['./view-finder-os.component.scss']
})
export class ViewFinderOSComponent implements OnInit {

  public loginIsVisible: boolean;
  public loginLoaded: boolean;
  public loginView: boolean;
  public classLogin: string;

  constructor() { 
    this.loginIsVisible = true;
    this.loginLoaded = true;
    this.loginView = true;
    this.classLogin = '';
  }

  ngOnInit(): void {}

  public login(classString: string) {
    this.classLogin = classString;
    this.loginLoaded = false;
    setTimeout(()=> this.classLogin = 'end-animation', 1100);
  }


}
