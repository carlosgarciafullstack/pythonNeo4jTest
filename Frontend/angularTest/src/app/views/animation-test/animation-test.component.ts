import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { AnimationTestService } from '@core/services/animationTest.service';

@Component({
  selector: 'app-animation-test',
  templateUrl: './animation-test.component.html',
  styleUrls: ['./animation-test.component.scss']
})
export class AnimationTestComponent implements OnInit {

  
  constructor(public test: AnimationTestService) { 
    
  }

  ngOnInit(): void {
  }


}
