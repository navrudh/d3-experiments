import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-chord-diagram',
  templateUrl: './chord-diagram.component.html',
  styleUrls: ['./chord-diagram.component.css']
})
export class ChordDiagramComponent implements OnInit, OnChanges {

  @ViewChild('chord') private chartContainer: ElementRef;
  @Input() private data: any;
  @Input() private width: number;
  @Input() private height: number;
  private margin: any = { top: 20, bottom: 20, left: 20, right: 20 };
  private chart: any;
  private svg: any;
  private chord: any;
  private arc: any;
  private ribbon: any;
  private _width: number;
  private _height: number;
  private outerRadius: number;
  private innerRadius: number;
  private formatValue: any;
  private colors: any;

  constructor() { }

  ngOnInit() {
    this.createChart();
    if (this.data) {
      this.updateChart();
    }
  }

  ngOnChanges() {
    if (this.chart) {
      this.updateChart();
    }
  }

  createChart() {
    const element = this.chartContainer.nativeElement;

    this._width = this.width - this.margin.left - this.margin.right;
    this._height = this.height - this.margin.top - this.margin.bottom;
    this.outerRadius = Math.min(this._width, this._height) * 0.5 - 40;
    this.innerRadius = this.outerRadius - 30;

    this.svg = d3.select(element).append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    this.formatValue = d3.formatPrefix(',.0', 1e3);

    this.chord = d3.chord().padAngle(0.05).sortSubgroups(d3.descending);
    this.arc = d3.arc().innerRadius(this.innerRadius).outerRadius(this.outerRadius);
    this.ribbon = d3.ribbon().radius(this.innerRadius);
    this.chart = this.svg.append('g')
      .attr('transform', `translate(${this._width / 2}, ${this._height / 2})`);

    // colors
    this.colors = d3.scaleOrdinal().domain(d3.range(4).map(String)).range(<any[]>['red', 'blue', 'green', 'purple']);

  }

  updateChart() {
    const g = this.chart.append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .datum(this.chord(this.data.matrix));

    const group = g.append('g')
      .attr('class', 'groups')
      .selectAll('g')
      .data(chords => chords.groups)
      .enter().append('g');

    group.append('path')
      .style('fill', d => this.colors(d.index))
      .style('stroke', d => d3.rgb(this.colors(d.index)).darker())
      .attr('d', this.arc);

    const groupTick = group.selectAll('.group-tick')
      .data(d => this.groupTicks(d, 1e3))
      .enter().append('g')
      .attr('class', 'group-tick')
      .attr('transform', d => `rotate(${d.angle * 180 / Math.PI - 90}) translate(${this.outerRadius}, 0)`);

    groupTick.append('line')
      .attr('x2', 6);

    groupTick
      .filter(d => d.value % 5e3 === 0)
      .append('text')
      .attr('x', 8)
      .attr('dy', '.35em')
      .attr('transform', d => d.angle > Math.PI ? `rotate(180) translate(-16)` : null)
      .style('text-anchor', d => d.angle > Math.PI ? 'end' : null)
      .text(d => this.formatValue(d.value));

    g.append('g')
      .attr('class', 'ribbons')
      .selectAll('path')
      .data(chords => chords)
      .enter().append('path')
      .attr('d', this.ribbon)
      .style('fill', d => this.colors(d.target.index))
      .style('stroke', d => d3.rgb(this.colors(d.target.index)).darker());
  }

  groupTicks(d, step) {
    const k = (d.endAngle - d.startAngle) / d.value;
    return d3.range(0, d.value, step).map(function (value) {
      return { value: value, angle: value * k + d.startAngle };
    });
  }

}
