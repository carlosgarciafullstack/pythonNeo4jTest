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
  public zoom = 16.1;
  public longitude: number;
  public latitude: number;

  // Init location
  private initLong = -2.4125;
  private initLat = 43.1746;
  // Manhattan location
  private manhattanLong = -74.007;
  private manhattanLat = 40.7087;

  constructor() {
    // Asignamos el token desde las variables de entorno
    this.mapbox.accessToken = environment.mapBoxToken;
    this.longitude = this.manhattanLong;
    this.latitude = this.manhattanLat;
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.longitude, this.latitude],
      bearing: 26,
      pitch: 60,
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    }
}
