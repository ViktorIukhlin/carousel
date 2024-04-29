import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [BrowserModule, ComponentsModule, RouterOutlet],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
