import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { BackgroundService } from 'src/app/services/background.service';

@Component({
  selector: 'app-config-menu-system-program',
  templateUrl: './config-menu-system-program.component.html',
  styleUrls: ['./config-menu-system-program.component.scss']
})
export class ConfigMenuSystemProgramComponent implements OnInit {

  public backgroundSelectionType: FormControl;

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  constructor(public backgroundService: BackgroundService) {
    this.backgroundSelectionType = new FormControl(this.backgroundService.typeBackgroundSelection);
  }
  
  ngOnInit(): void {
    this.backgroundSelectionType.valueChanges.subscribe(
      () => this.backgroundService.changeTypeBackground(this.backgroundSelectionType.value)
    );
  }

  public selected(item: any) {
    this.backgroundService.backgrounds.forEach(element => {
      if (element.isSelected) element.isSelected = false;
    });
    item.isSelected = true;
    this.backgroundService.changeBackground();
  }

  public changeSetting(event: any) {
    this.backgroundService.changeBackgroundSetting(event.value);
  }
  
}

