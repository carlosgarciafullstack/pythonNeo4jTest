import { Component } from '@angular/core';
import { ProgramLauncher } from 'src/app/models/entities/program-launcher.entity';
import { SystemService } from 'src/app/services/system.service';
import { TaskManagerService } from 'src/app/services/task-manager.service';

@Component({
  selector: 'app-menu-init',
  templateUrl: './menu-init.component.html',
  styleUrls: ['./menu-init.component.scss']
})
export class MenuInitComponent {
  
  public fillColor: string;
  public configMenu: ProgramLauncher;

  constructor(
    public systemService: SystemService,
    public taskManager: TaskManagerService
  ) { 
    this.fillColor = '#fff';
    this.configMenu = new ProgramLauncher(40, 'Configuration', 'settings', 'system-program-config-menu','S');
  }

  ngOnInit(): void {}

  public openProgram(program: ProgramLauncher) {
    this.taskManager.openSystemProgram(program);
  }

}
