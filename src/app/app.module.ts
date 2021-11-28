import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { EventsModule, OrderConditionModule, ToolModule } from '@circe/core';
import { HttpClientModule } from '@angular/common/http';
import { INITIALIZER } from './_config/initializer.config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    OrderConditionModule,
    ToolModule.forChild(),
    EventsModule.forChild()
  ],
  providers: [
    INITIALIZER
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
