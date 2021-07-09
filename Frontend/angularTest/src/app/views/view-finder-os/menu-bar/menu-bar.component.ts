import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SystemService } from 'src/app/services/system.service';
import { TaskManagerService } from 'src/app/services/task-manager.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuBarComponent implements OnInit {

  constructor(
    public taskManager: TaskManagerService, 
    public systemService: SystemService 
  ) {}

  ngOnInit(): void {}

  public minimizeAll() {
    this.taskManager.minimizeAll();
  }

}
