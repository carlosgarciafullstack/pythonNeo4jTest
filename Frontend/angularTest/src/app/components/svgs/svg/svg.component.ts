import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg',
  templateUrl: '../../../../assets/img/icon-win3.svg',
  styleUrls: ['./svg.component.scss']
})
export class SvgComponent {

  @Input() fillColor = '#ff2';
  @Input() width= '21px';
  @Input() height= '21px';

  changeColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.fillColor = `rgb(${r}, ${g}, ${b})`;
  }

}

