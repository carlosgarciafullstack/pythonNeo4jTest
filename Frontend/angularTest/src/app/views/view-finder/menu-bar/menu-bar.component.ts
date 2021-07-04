import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TaskManagerProvider } from 'src/app/providers/task-manager.provider';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuBarComponent implements OnInit {

  public fillColor: string;

  constructor(public taskManager: TaskManagerProvider ) { 
    this.fillColor = '#fff';
  }

  ngOnInit(): void {
  }

  public hideAll() {
    this.taskManager.minimizeAll();
  }

}
