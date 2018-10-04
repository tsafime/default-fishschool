import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'm-fish-schools',
  templateUrl: './fish-schools.component.html',
  // styleUrls: ['./fish-schools.component.scss']
})
export class FishSchoolsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	console.log('On init...');
  }
}
