import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {

  public backgrounds: any[];
  public routeBackgrounds: string;
  public srcBackgroundSelected: string;
  public classCssBackgroundSelected: any;
  public backgroundSettings: any [];

  constructor() {
    this.routeBackgrounds = 'assets/img/';
    this.backgrounds = [{
      id: 0,
      name: 'Beach',
      src: this.routeBackgrounds + 'win-beach.png',
      isSelected: true
    }, {
      id: 1,
      name: 'Moon',
      src: this.routeBackgrounds + 'moon.png',
      isSelected: false
    }];
    this.backgroundSettings = [
      {value: 'background-fill', viewValue: 'fill'},
      {value: 'background-adjust', viewValue: 'adjust'},
      {value: 'background-adjust-right', viewValue: 'adjust_right'},
      {value: 'background-expand', viewValue: 'expand'},
      {value: 'background-original', viewValue: 'original'}
    ];
    this.srcBackgroundSelected = '';
    this.classCssBackgroundSelected = this.backgroundSettings[0];
    this.changeBackground();
  }

  public changeBackground() {
    this.srcBackgroundSelected = 'url(' + this.backgrounds.find(e => e.isSelected == true).src + ')';
  }

  public changeBackgroundSetting(option: any) {
    this.classCssBackgroundSelected = option;
  }
}