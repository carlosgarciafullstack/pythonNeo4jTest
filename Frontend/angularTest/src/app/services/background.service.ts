import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {

  public backgrounds: any[];
  public routeBackgrounds: string;
  public srcBackgroundSelected: string;

  constructor() {
    this.routeBackgrounds = 'assets/img/';
    this.backgrounds = [{
      id: 0,
      name: 'Beach',
      src: this.routeBackgrounds + 'win-beach.png',
      isSelected: false
    }, {
      id: 1,
      name: 'Moon',
      src: this.routeBackgrounds + 'moon.png',
      isSelected: true
    }];
    this.srcBackgroundSelected = '';
  }

  public changeBackgorund() {
    this.srcBackgroundSelected = 'url(' + this.backgrounds.find(e => e.isSelected == true).src + ')';
  }
}