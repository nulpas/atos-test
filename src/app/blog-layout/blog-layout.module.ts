import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogLayoutComponent } from './blog-layout.component';
import { BlogLayoutRoutingModule } from './blog-layout-routing.module';
import { HeaderModule } from '../header/header.module';
import { SidebarModule } from '../sidebar/sidebar.module';
import { NotificationModule } from '@circe/notification';

@NgModule({
  declarations: [BlogLayoutComponent],
  imports: [
    CommonModule,
    BlogLayoutRoutingModule,
    HeaderModule,
    SidebarModule,
    NotificationModule
  ]
})
export class BlogLayoutModule {}
