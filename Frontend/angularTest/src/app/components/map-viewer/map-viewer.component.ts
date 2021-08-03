import { Component, OnInit } from '@angular/core';
import { MapViewerService } from '@core/services/map-viewer.service'

@Component({
  selector: 'app-map-viewer',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.scss']
})
export class MapViewerComponent implements OnInit {

  constructor(private map: MapViewerService) { }

  ngOnInit(): void {
    this.map.buildMap();
  }

}
