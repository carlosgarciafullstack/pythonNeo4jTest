import { Component, Input, OnInit } from '@angular/core';
import { ProgramLauncher } from 'src/app/models/entities/program-launcher.entity';

@Component({
  selector: 'app-status-icon',
  templateUrl: './status-icon.component.html',
  styleUrls: ['./status-icon.component.scss']
})
export class StatusIconComponent implements OnInit {

  @Input() public program: ProgramLauncher;

  constructor() { 
    this.program = new ProgramLauncher();
  }

  ngOnInit(): void {}

}
