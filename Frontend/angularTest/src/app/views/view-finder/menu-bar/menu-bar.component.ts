import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TaskManagerService } from 'src/app/services/task-manager.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuBarComponent implements OnInit {

  public fillColor: string;

  constructor(public taskManager: TaskManagerService ) { 
    this.fillColor = '#fff';
  }

  ngOnInit(): void {
  }

  public minimizeAll() {
    this.taskManager.minimizeAll();
  }

}
