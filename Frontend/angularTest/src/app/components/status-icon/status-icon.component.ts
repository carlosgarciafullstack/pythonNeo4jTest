import { Component, Input, OnInit } from '@angular/core';
import { MainProgram } from 'src/app/models/entities/main-program.entity';

@Component({
  selector: 'app-status-icon',
  templateUrl: './status-icon.component.html',
  styleUrls: ['./status-icon.component.scss']
})
export class StatusIconComponent implements OnInit {

  @Input() public program?: MainProgram;

  constructor() { 
    this.program = undefined;
  }

  ngOnInit(): void {
  }

}
