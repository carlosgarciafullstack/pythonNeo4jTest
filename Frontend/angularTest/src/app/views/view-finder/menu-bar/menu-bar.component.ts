import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuBarComponent implements OnInit {

  public fillColor: string;

  constructor() { 
    this.fillColor = '#fff';
  }

  ngOnInit(): void {
  }

}
