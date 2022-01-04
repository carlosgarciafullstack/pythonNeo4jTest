import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';

import { ElementRef, Inject, Injectable, NgZone, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EngineFrameService implements OnDestroy {

  private canvas!: HTMLCanvasElement;
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private light!: THREE.AmbientLight;
  private cube!: THREE.Mesh;
  private frameId: number = 0;
  private controls!: OrbitControls;
  private lightProbe!: THREE.LightProbe;
  private cubeCamera!: THREE.CubeCamera;
  private cubeRenderTarget!: THREE.WebGLCubeRenderTarget;

  public constructor(private ngZone: NgZone) {
  }

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = canvas.nativeElement;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,    // transparent background
      antialias: true // smooth edges
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight - 40);

    // create the scene
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75, (window.innerWidth) / (window.innerHeight - 40), 0.1, 1000
    );
    this.camera.position.z = 5;
    this.scene.add(this.camera);

    this.cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
      encoding: THREE.sRGBEncoding, // since gamma is applied during rendering, the cubeCamera renderTarget texture encoding must be sRGBEncoding
      format: THREE.RGBAFormat
    });

    //Controls
    this.cubeCamera = new THREE.CubeCamera(1, 1000, this.cubeRenderTarget);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.activeControls();

    // soft white light
    this.light = new THREE.AmbientLight(0x404040);
    this.light.position.z = 10;
    this.scene.add(this.light);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

  }

  public animate(): void {
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      }

      window.addEventListener('resize', () => {
        this.resize();
      });
    });
  }

  public render(): void {
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }

  public resize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight - 40;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }


  public activeControls(): void {
    this.controls.addEventListener('change', this.render);
    this.controls.minDistance = 10;
    this.controls.maxDistance = 50;
    this.controls.enablePan = false;

    // probe
    this.lightProbe = new THREE.LightProbe();
    this.scene.add(this.lightProbe);

    // envmap
    const genCubeUrls = function (prefix: any, postfix: any) {

      return [
        prefix + 'px' + postfix, prefix + 'nx' + postfix,
        prefix + 'py' + postfix, prefix + 'ny' + postfix,
        prefix + 'pz' + postfix, prefix + 'nz' + postfix
      ];

    };

    const urls = genCubeUrls('textures/cube/pisa/', '.png');

    new THREE.CubeTextureLoader().load(urls, (cubeTexture) => {

      cubeTexture.encoding = THREE.sRGBEncoding;
      this.scene.background = cubeTexture;
      this.cubeCamera.update(this.renderer, this.scene);

      //this.lightProbe.copy(LightProbeGenerator.fromCubeRenderTarget(this.renderer, this.cubeRenderTarget));

      //this.scene.add(new LightProbeHelper(this.lightProbe, 5));

      this.render();

    });

    // listener
    window.addEventListener('resize', this.onWindowResize);

  }

  public onWindowResize() {

    this.renderer.setSize( window.innerWidth, window.innerHeight );

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.render();

  }

  public ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }
}