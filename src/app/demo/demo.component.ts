import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  private chartData = {
    matrix: null,
    properties: null
  };

  constructor() {
    this.chartData.matrix = [
      [11975, 5871, 8916, 2868],
      [1951, 10048, 2060, 6171],
      [8010, 16145, 8090, 8045],
      [1013, 990, 940, 6907]
    ];
    this.chartData.properties = [
      { name: 'Mercury', color: '#067d72' },
      { name: 'Neptune', color: '#1365a6' },
      { name: 'Uranus', color: '#e6125a' },
      { name: 'Jupiter', color: 'yellow' }
    ]
  }

  ngOnInit() {
  }

}
