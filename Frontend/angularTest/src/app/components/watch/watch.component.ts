import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { WatchStyles } from 'src/app/models/interfaces/watch-styles.interface';
import { WATCH_STYLES } from './watchStyles';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit, OnDestroy {

  public format_one: string;
  public format_two: string;
  public activeStyle: WatchStyles;

  private activeStyleIndex: number;
  private watchStyles: WatchStyles[];
  private date: any;
  private idInterval: any;

  constructor() {
    this.format_one = '';
    this.format_two = '';
    this.date = moment();
    this.activeStyleIndex = 1;
    this.watchStyles = WATCH_STYLES;
    this.activeStyle = this.watchStyles[this.activeStyleIndex];
    this.idInterval = undefined;
  }

  ngOnInit(): void {
    this.initClock();
  }

  private initClock() {
    if(this.activeStyle != undefined && this.activeStyle.formats != undefined) {
      this.updateTime(true);
      this.idInterval = setInterval(() => this.updateTime(), 1000);
    }
  }

  private stopClock() {
    clearInterval(this.idInterval);
  }

  private updateTime(init: boolean = false) {
    if(init) {
      this.date = moment();
    } else {
      this.date.add(1, 's')
    }
      
    
    this.format_one = this.date.format(this.activeStyle.formats[0]);
    if(this.activeStyle.formats.length > 1) {
      this.format_two = this.date.format(this.activeStyle.formats[1]);
    }
  }

  public toggleStyles() {
    if (this.activeStyleIndex == this.watchStyles.length - 1) {
      this.activeStyleIndex = 0;
    } else {
      this.activeStyleIndex++;
    }
    this.changeStyle(this.activeStyleIndex);
  }

  private changeStyle(index: number) {
    this.stopClock();
    this.activeStyleIndex = index;
    this.activeStyle = this.watchStyles[index];
    this.initClock();
  }

  ngOnDestroy(): void {
    this.stopClock();
  }
}
