import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationTestService } from '@core/services/animationTest.service';

@Component({
  selector: 'app-animation-test2',
  templateUrl: './animation-test2.component.html',
  styleUrls: ['./animation-test2.component.scss']
})
export class AnimationTest2Component implements OnInit {

  constructor(public router: Router, public test: AnimationTestService) { 
  }

  ngOnInit(): void {
  }

  play() {
    this.test.isPlay = !this.test.isPlay;
    setTimeout( () => this.router.navigate(['test2']), 1800);
  }

}
