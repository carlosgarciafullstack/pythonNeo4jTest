import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapViewerService {

  public mapbox = (mapboxgl as typeof mapboxgl);
  public map!: mapboxgl.Map;
  public style = `mapbox://styles/carlosgarciafullstack/ckrwhfy0xbid219o1otkyp2wb`;

  // Coordenadas de la localización donde queremos centrar el mapa
  public lat = 43.1746;
  public lng = -2.4125;
  public zoom = 15;

  constructor() {
    // Asignamos el token desde las variables de entorno
    this.mapbox.accessToken = environment.mapBoxToken;
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    }
}
