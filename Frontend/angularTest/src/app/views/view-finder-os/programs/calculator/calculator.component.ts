import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  public url: string;
  constructor() { 
    this.url = "https://www.ssega.com/play/amy-in-sonic-1/3515";
  }
  // https://www.genbeta.com/a-fondo/trece-webs-y-herramientas-para-disfrutar-de-juegos-clasicos-desde-el-navegador
  ngOnInit(): void {
  }

}
