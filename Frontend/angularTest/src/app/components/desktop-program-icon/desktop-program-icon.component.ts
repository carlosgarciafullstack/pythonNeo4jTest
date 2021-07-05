import { Component, Inject, Input, OnInit } from '@angular/core';
import { Program } from 'src/app/models/entities/program.entity';
import { TaskManagerService } from 'src/app/services/task-manager.service';

@Component({
  selector: 'app-desktop-program-icon',
  templateUrl: './desktop-program-icon.component.html',
  styleUrls: ['./desktop-program-icon.component.scss']
})
export class DesktopProgramIconComponent implements OnInit {

  @Input() public program: Program;

  constructor(
    public taskManager: TaskManagerService, 
  ) {
    this.program = new Program();
  }

  ngOnInit(): void {}

  public click(data: any) {
    if(data.detail == 2) {
      this.taskManager.open(this.program);
    }
  }
  
}
