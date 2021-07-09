import { Component, Input, OnInit } from '@angular/core';
import { ProgramLauncher } from 'src/app/models/entities/program-launcher.entity';
import { TaskManagerService } from 'src/app/services/task-manager.service';

@Component({
  selector: 'app-init-menu-items',
  templateUrl: './init-menu-items.component.html',
  styleUrls: ['./init-menu-items.component.scss']
})
export class InitMenuItemsComponent implements OnInit {

  @Input() programs: ProgramLauncher[];
  
  constructor(
    public taskManager: TaskManagerService
  ) {
    this.programs = [];
  }

  ngOnInit(): void {}

  public click(event: any, program: ProgramLauncher) {
    if(event.detail == 1) {
      this.taskManager.open(JSON.parse(JSON.stringify(program)));
    }
  }

}
