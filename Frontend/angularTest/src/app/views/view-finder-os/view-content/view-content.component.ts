import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProgramLauncher } from 'src/app/models/entities/program-launcher.entity';
import { BackgroundService } from 'src/app/services/background.service';
import { SystemService } from 'src/app/services/system.service';

@Component({
  selector: 'app-view-content',
  templateUrl: './view-content.component.html',
  styleUrls: ['./view-content.component.scss']
})
export class ViewContentComponent {

  constructor(
    public systemService: SystemService,
    public backgroundService: BackgroundService
  ) {
    
  }

  ngOnInit(): void {
  }

}
