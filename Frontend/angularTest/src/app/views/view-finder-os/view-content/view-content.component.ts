import { Component } from '@angular/core';
import { BackgroundService } from '@core/services/background.service';
import { SystemService } from '@core/services/system.service';

@Component({
  selector: 'app-view-content',
  templateUrl: './view-content.component.html',
  styleUrls: ['./view-content.component.scss']
})
export class ViewContentComponent {

  constructor(
    public systemService: SystemService,
    public backgroundService: BackgroundService
  ) {}
}
