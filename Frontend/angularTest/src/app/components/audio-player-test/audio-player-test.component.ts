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

  public audioStateLabel = 'Audio sample';

  private audio: HTMLMediaElement;

  //https://auth0.com/blog/building-an-audio-player-app-with-angular-and-rxjs/
  public constructor() { 
    this._audioRef = new ElementRef('<div>');
    this.audio = new Audio();
    this.src = "assets/sound/track-one.mp3";
  }

  public pause(): void {
    if (this.audio) {
      this.audio.pause();
      this.audioStateLabel = 'Paused';
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
  }

  public ngAfterViewInit() {
    this.audio = this._audioRef.nativeElement;
    if (this.audio) {
      this.audio.volume = this.volume;
      this.audio.autoplay = this.autoplay;
    }
  }
}