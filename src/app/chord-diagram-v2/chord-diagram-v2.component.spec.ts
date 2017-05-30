import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordDiagramV2Component } from './chord-diagram-v2.component';

describe('ChordDiagramV2Component', () => {
  let component: ChordDiagramV2Component;
  let fixture: ComponentFixture<ChordDiagramV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChordDiagramV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChordDiagramV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
