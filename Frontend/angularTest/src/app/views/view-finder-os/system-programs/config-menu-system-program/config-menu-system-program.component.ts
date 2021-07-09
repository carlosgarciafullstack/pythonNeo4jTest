import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { BackgroundService } from 'src/app/services/background.service';

@Component({
  selector: 'app-config-menu-system-program',
  templateUrl: './config-menu-system-program.component.html',
  styleUrls: ['./config-menu-system-program.component.scss']
})
export class ConfigMenuSystemProgramComponent implements OnInit {

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  public isVisibleBackgrounds: boolean;

  constructor(public backgroundService :BackgroundService) {
    
    this.isVisibleBackgrounds = false;
  }

  ngOnInit(): void {
  }

  public selected(item: any) {
    this.backgroundService.backgrounds.forEach(element => {
      if (element.isSelected) element.isSelected = false;
    });
    item.isSelected = true;
  }
  public saveSelected() {
    this.isVisibleBackgrounds = false;
    this.backgroundService.changeBackgorund();
  }

}

