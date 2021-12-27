import { Injectable } from "@angular/core";
import { IUserConfig } from "@core/models/interfaces/user-config.interface";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {

  public typeBackgroundSelection: any;
  public activeMapBackground: boolean;
  public backgrounds: any[];
  public routeBackgrounds: string;
  public srcBackgroundSelected: string;
  public classCssBackgroundSelected: any;
  public backgroundSettings: any [];

  public changeConfig: Subject<IUserConfig>;
  private userConfig!: IUserConfig;

  constructor() {
    this.changeConfig = new Subject<IUserConfig>();
    this.routeBackgrounds = 'assets/img/';
    this.activeMapBackground = false;
    this.typeBackgroundSelection = 'image';
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

  public setConfig(config: IUserConfig) {
    this.userConfig = config;
    console.log("CONFIG", config);
    if(!this.mapBackground(config.mapBackground)){
      this.setBackground( Number(config.background));
      this.changeBackgroundSetting(config.classCssBackground);
    }
  }

  public changeBackground() {
    let item = this.backgrounds.find(e => e.isSelected == true);
    this.srcBackgroundSelected = 'url(' + item.src + ')';
    
  }

  public changeBackgroundSetting(option: any) {
    this.classCssBackgroundSelected = option;
    this.userConfig.classCssBackground = option;
    this.changeConfig.next(this.userConfig);
  }

  public changeTypeBackground(option: string) {
    this.typeBackgroundSelection = option;
    this.userConfig.mapBackground = option;
    if(this.typeBackgroundSelection == "map") {
      this.activeMapBackground = true;
    } else {
      this.activeMapBackground = false;
    }
    this.changeConfig.next(this.userConfig);
  }

  public activeBackground(item: any) {
    this.backgrounds.forEach(element => {
      if (element.isSelected) element.isSelected = false;
    });
    item.isSelected = true;
    this.changeBackground();
    this.userConfig.background = item.id;
    this.changeConfig.next(this.userConfig);
  }

  private mapBackground(mapBackground: string) {
    console.log(mapBackground);
    let activeMapBackground = false;
    if(mapBackground == 'map'){
      activeMapBackground = true;
      this.activeMapBackground = true;
    }
    return activeMapBackground;
  }

  private setBackground(id: number) {
    let background = this.backgrounds.find(e => e.id == id);
    this.activeBackground(background);
  }

  
}