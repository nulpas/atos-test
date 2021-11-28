import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { EventsModule, OrderConditionModule, ToolModule } from '@circe/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { INITIALIZER } from './_config/initializer.config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationModule } from '@circe/notification';
import { RequestInterceptor } from './_interceptors/request.interceptor';

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
    EventsModule.forChild(),
    NotificationModule.forChild()
  ],
  providers: [
    INITIALIZER,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
