import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChordDiagramComponent } from './chord-diagram/chord-diagram.component';
import { DemoComponent } from './demo/demo.component';
import { ChordDiagramV2Component } from './chord-diagram-v2/chord-diagram-v2.component';

@NgModule({
  declarations: [
    AppComponent,
    ChordDiagramComponent,
    DemoComponent,
    ChordDiagramV2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
