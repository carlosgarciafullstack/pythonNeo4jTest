import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-audio-player-test',
  templateUrl: './audio-player-test.component.html',
  styleUrls: ['./audio-player-test.component.scss']
})
export class AudioPlayerTestComponent implements AfterViewInit {

  @Input() public src: string;
  @Input() public autoplay: boolean = false;
  @Input() public showStateLabel: boolean = false;
  @Input() public volume: number = 1.0; /* 1.0 is loudest */

  @ViewChild('audioElement', { static: false }) public _audioRef:  ElementRef;
  @ViewChild('audioPlayerCanvas', {static: false}) public canvasElement!:  ElementRef;

  public context!: CanvasRenderingContext2D;
  public analyser!: AnalyserNode;

  public audioStateLabel = 'Audio sample';
  public mute: boolean;

  public WIDTH: number;
  public HEIGHT: number;

  public xcenter = 200;
  public ycenter = 110;
  public radius = 0;
  public radiusmax = 100;
  public start_angle1 = 0;
  public start_angle2 = 0;
  public observerAnimation$!: number;

  private audio: HTMLMediaElement;

  //https://auth0.com/blog/building-an-audio-player-app-with-angular-and-rxjs/
  public constructor() { 
    this._audioRef = new ElementRef('<div>');
    this.audio = new Audio();
    this.src = "assets/sound/track-one.mp3";
    this.mute = false;
    this.volume = 1;
    this.WIDTH = 450;
    this.HEIGHT = 300;
  }

  public pause(): void {
    if (this.audio) {
      this.audio.pause();
      this.audioStateLabel = 'Paused';
      cancelAnimationFrame(this.observerAnimation$)
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
    }
    //this.renderFrame();
    //this.update();
    this.playvisualizer20();
  }

  public ngAfterViewInit() {
    this.audio = this._audioRef.nativeElement;
    if (this.audio) {
      this.audio.volume = 1;
      this.audio.autoplay = this.autoplay;
    }
    this.context = this.canvasElement.nativeElement.getContext('2d');
    //this.playVisualizer();
    console.log("canvasElement", this.canvasElement);
    console.log("this.audio", this.audio);
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

  private playvisualizer20() {
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

    this.visualizer20();
  }

  private visualizer20() {
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray);
    this.analyser.fftSize = 256;

    this.context.fillStyle = "#000";
    this.context.fillRect(0, 0, this.WIDTH, this.HEIGHT);

    let barHeight;
    let x = 0;
    let barWidth = (this.WIDTH / bufferLength) * 2.5;

    for (var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];
      
      var r = barHeight + (25 * (i/bufferLength));
      var g = 250 * (i/bufferLength);
      var b = 50;

      this.context.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      this.context.fillRect(x, this.HEIGHT - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }
    console.log("Procesing...");

    requestAnimationFrame(()=> this.visualizer20());
  }

  private playVisualizer() {
    /*
    const audioCtx = new window.AudioContext();
    this.audio.createBufferSource();
    let source = audioCtx.createBufferSource(); // creates a sound source
    source.buffer = buffer;                    // tell the source which sound to play
    source.connect(context.destination);       // connect the source to the context's destination (the speakers)
    source.start(0);             


    */
    const audioCtx = new window.AudioContext();
    let source = audioCtx.createMediaElementSource(this.audio);
    this.analyser = audioCtx.createAnalyser();
    
    source.connect(this.analyser);
    //this connects our music back to the default output, such as your //speakers 
    source.connect(audioCtx.destination)

    let WIDTH = 450;
    let HEIGHT = 300;
    this.canvasElement.nativeElement.width = WIDTH;
    this.canvasElement.nativeElement.height = HEIGHT;

    this.analyser.connect(source);

    this.analyser.fftSize = 256;
    
  }

  public renderFrame() {
    //window.requestAnimationFrame(this.renderFrame)
    //requestAnimationFrame(() => this.renderFrame());
    let WIDTH = 450;
    let HEIGHT = 300;
    
    let barHeight;
    let x = 0;
    let bufferLength = this.analyser.frequencyBinCount;
    let barWidth = (WIDTH / bufferLength) * 2.5;
    let dataArray = new Uint8Array(bufferLength);
    console.log("AAAAAAAAAAAAA",this.analyser.getByteFrequencyData(dataArray));

    this.context.fillStyle = "#000";
    this.context.fillRect(0, 0, WIDTH, HEIGHT);
   
    for (var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];
      
      var r = barHeight + (25 * (i/bufferLength));
      var g = 250 * (i/bufferLength);
      var b = 50;

      this.context.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      this.context.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }
    console.log("Procesing...");
  }

  // ------------------------------

  public toRadians(angle: number) {
    return angle * (Math.PI / 180);
  }

  public draw(x1: number, y1: number, x2: number, y2: number) {
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.stroke();
  }

  public drawWheel(xc: number, yc: number, start_angle: number, count: number, rad: number) {
    var inc = 360 / count;
    for (var angle = start_angle; angle < start_angle + 180; angle += inc) {
      var x = Math.cos(this.toRadians(angle)) * rad;
      var y = Math.sin(this.toRadians(angle)) * rad;
      this.draw(xc - x, yc - y, xc + x, yc + y);
    }
  }

  public update() {
    this.start_angle1 += 0.1;
    this.start_angle2 -= 0.1;
    let WIDTH = 450;
    let HEIGHT = 300;
    if(this.radius<this.radiusmax) this.radius++;
    this.context.clearRect(0, 0, WIDTH, HEIGHT);
    this.drawWheel(this.xcenter, this.ycenter, this.start_angle1, 40, this.radius);
    this.drawWheel(this.xcenter, this.ycenter, this.start_angle2, 40, this.radius);
    this.observerAnimation$ = requestAnimationFrame(() => this.update());
  }





}