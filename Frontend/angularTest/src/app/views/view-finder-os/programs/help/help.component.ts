import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /*
router.navigate([{outlets: {primary: 'path' ,sidebar: 'path'}}]);
Or also using the routerLink directive


<a [routerLink]="[{ outlets: { primary: ['path'],sidebar: ['path'] } }]">
    Products List
</a>


  */
}
