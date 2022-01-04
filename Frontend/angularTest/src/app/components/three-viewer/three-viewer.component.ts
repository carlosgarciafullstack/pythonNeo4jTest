import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { EngineFrameService } from '@core/services/engineRender.service';

@Component({
  selector: 'app-three-viewer',
  templateUrl: './three-viewer.component.html',
  styleUrls: ['./three-viewer.component.scss']
})
export class TreeViewerComponent implements OnInit {

  @ViewChild('rendererCanvas', { static: true }) public rendererCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private engService: EngineFrameService) {
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.engService.createScene(this.rendererCanvas);
    this.engService.animate();
  }

}