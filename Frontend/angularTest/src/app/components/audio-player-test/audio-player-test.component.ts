import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-audio-player-test',
  templateUrl: './audio-player-test.component.html',
  styleUrls: ['./audio-player-test.component.scss']
})
export class AudioPlayerTestComponent implements AfterViewInit, OnDestroy {

  @Input() public src: string;
  @Input() public autoplay: boolean = false;
  @Input() public showStateLabel: boolean = false;
  @Input() public volume: number = 1.0; /* 1.0 is loudest */

  @ViewChild('audioElement', { static: false }) public _audioRef:  ElementRef;
  @ViewChild('audioPlayerCanvas', {static: false}) public canvasElement!:  ElementRef;
  @ViewChild('audioViewer', {static: false}) public divElement!:  ElementRef;

  private readonly CONST_WIDTH = 1024;
  private readonly CONST_HEIGHT= 512;

  public context!: CanvasRenderingContext2D;
  public analyser!: AnalyserNode;

  public isMaximize = false;

  public audioStateLabel = 'Audio sample';
  public mute: boolean;

  public WIDTH: number;
  public HEIGHT: number;

  public R: number;
  public G: number;
  public B: number;

  public xcenter = 200;
  public ycenter = 110;
  public radius = 0;
  public radiusmax = 100;
  public start_angle1 = 0;
  public start_angle2 = 0;

  public toggleAnimation = false;
  public observerAnimationRandom$!: number;
  public observerAnimationAudio$!: number;

  private audio: HTMLMediaElement;

  public constructor() { 
    this._audioRef = new ElementRef('<div>');
    this.audio = new Audio();
    this.src = "assets/sound/track-one.mp3";
    this.mute = false;
    this.volume = 1;
    this.WIDTH = this.CONST_WIDTH;
    this.HEIGHT = this.CONST_HEIGHT;
    this.R = 25;
    this.G = 250;
    this.B = 50;
  }

  @HostListener('window:resize2', ['$event']) onResize(event: any) {
    let div = this.divElement.nativeElement;
    let width = div.offsetWidth;
    let height = div.offsetHeight;
    this.resizeCanvas(width, height)
  }
  
  ngOnDestroy(): void {
    if(this.observerAnimationRandom$ != -1) cancelAnimationFrame(this.observerAnimationRandom$);
    if(this.observerAnimationAudio$ != -1) cancelAnimationFrame(this.observerAnimationAudio$);
  }
  

  public ngAfterViewInit() {
    this.audio = this._audioRef.nativeElement;
    if (this.audio) {
      this.audio.volume = 1;
      this.audio.autoplay = this.autoplay;
    }
    this.context = this.canvasElement.nativeElement.getContext('2d');
    this.playAudioViewer();
  }

  // ---------- AUDIO CONTROLS---------------- //

  public pause(): void {
    if (this.audio) {
      this.audio.pause();
      this.audioStateLabel = 'Paused';
      if (this.observerAnimationRandom$ != -1 && this.toggleAnimation) {
        cancelAnimationFrame(this.observerAnimationRandom$);
        this.observerAnimationRandom$ = -1;
        console.log("observerAnimationRandom");
      }
    }
  }

  public get paused(): boolean {
    if (this.audio) {
      return this.audio.paused;
    } else {
      return true;
    }
  }

  public play(): void {
    if (this.audio) {
      if (this.audio.readyState >= 2) {
        this.audio.play();
        this.audioStateLabel = 'Playing...'
      }
      if (this.observerAnimationRandom$ == -1 && this.toggleAnimation) this.update();
    }
  }

  public stop(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
    if (this.observerAnimationRandom$ != -1 && this.toggleAnimation) {
      cancelAnimationFrame(this.observerAnimationRandom$);
      this.observerAnimationRandom$ = -1;
      console.log("observerAnimationRandom");
    }
  }

  public muteChange() {
    if(this.mute) {
      this.audio.volume = 1;
      this.volume = 1;
    } else {
      this.audio.volume = 0;
      this.volume = 0;
    }
    this.mute = !this.mute;
  }

  public changeValue(event: any) {
    this.audio.volume = event.value;
  }

  public toggleViewer() {
    this.toggleAnimation = !this.toggleAnimation;
    if(this.toggleAnimation) {
      cancelAnimationFrame(this.observerAnimationAudio$);
      this.observerAnimationAudio$ = -1;
      this.update();
    }else {
      cancelAnimationFrame(this.observerAnimationRandom$);
      this.observerAnimationRandom$ = -1;
      this.renderAudioViewer();
    }
  }

  private resizeCanvas(width: number, heigth: number) {
    if(!this.isMaximize) {
      this.WIDTH = width;
      this.HEIGHT = heigth;
      this.isMaximize = true;
    } else {
      this.WIDTH = this.CONST_WIDTH;
      this.HEIGHT = this.CONST_HEIGHT;
      this.isMaximize = false;
    }
    this.canvasElement.nativeElement.width = this.WIDTH;
    this.canvasElement.nativeElement.height = this.HEIGHT;
  }

  // ---------- AUDIO VIEWER BARS---------------- //

  private playAudioViewer() {
    const audioContext = new (window.AudioContext)();
    const track = audioContext.createMediaElementSource(
      this.audio
    );
    track.connect(audioContext.destination);
    // Analyzer node
    this.analyser = audioContext.createAnalyser();
    this.analyser.fftSize = 128;
    track.connect(this.analyser);

    this.canvasElement.nativeElement.width = this.WIDTH;
    this.canvasElement.nativeElement.height = this.HEIGHT;

    this.renderAudioViewer();
  }

  private renderAudioViewer() {
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray);
    this.analyser.fftSize = 256;

    this.context.fillStyle = "#000";
    this.context.fillRect(0, 0, this.WIDTH, this.HEIGHT);

    let barHeight;
    let x = 0;
    let barWidth = (this.WIDTH / bufferLength) * 2.5;
    let render =  Math.round(this.HEIGHT/256);
    for (var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];
      
      var r = barHeight + (this.R * (i/bufferLength));
      var g = this.G * (i/bufferLength);
      var b = this.B;

      this.context.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      this.context.fillRect(x, this.HEIGHT - barHeight * render, barWidth, barHeight * render);
      x += barWidth + 1;
    }

    this.observerAnimationAudio$ = requestAnimationFrame(()=> this.renderAudioViewer());
  }

  
  // ---------- ANIMATION CIRCLES ---------------- //

  private toRadians(angle: number) {
    return angle * (Math.PI / 180);
  }

  private draw(x1: number, y1: number, x2: number, y2: number) {
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.stroke();
  }

  private drawWheel(xc: number, yc: number, start_angle: number, count: number, rad: number) {
    var inc = 360 / count;
    for (var angle = start_angle; angle < start_angle + 180; angle += inc) {
      var x = Math.cos(this.toRadians(angle)) * rad;
      var y = Math.sin(this.toRadians(angle)) * rad;
      this.draw(xc - x, yc - y, xc + x, yc + y);
    }
  }

  private update() {
    this.start_angle1 += 0.1;
    this.start_angle2 -= 0.1;
    if(this.radius<this.radiusmax) this.radius++;
    this.context.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    this.drawWheel(this.xcenter, this.ycenter, this.start_angle1, 50, this.radius);
    this.drawWheel(this.xcenter, this.ycenter, this.start_angle2, 50, this.radius);

    this.observerAnimationRandom$ = requestAnimationFrame(() => this.update());
  }
}