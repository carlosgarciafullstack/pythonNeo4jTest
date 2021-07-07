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

  public colorIcon: string;

  constructor(
    public taskManager: TaskManagerService, 
  ) {
    this.program = new Program();
    this.colorIcon = '#'+(0x1000000 + Math.random()*0xffffff).toString(16).substr(1,6);
  }

  ngOnInit(): void {}

  public click(data: any) {
    if(data.detail == 2) {
      this.program.colorIcon = this.colorIcon;
      this.taskManager.open(this.program);
    }
  }
  
}
