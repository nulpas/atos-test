import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogLayoutComponent } from './blog-layout.component';
import { BlogLayoutRoutingModule } from './blog-layout-routing.module';
import { HeaderModule } from '../header/header.module';
import { SidebarModule } from '../sidebar/sidebar.module';



@NgModule({
  declarations: [
    BlogLayoutComponent
  ],
  imports: [
    CommonModule,
    BlogLayoutRoutingModule,
    HeaderModule,
    SidebarModule
  ]
})
export class BlogLayoutModule { }
