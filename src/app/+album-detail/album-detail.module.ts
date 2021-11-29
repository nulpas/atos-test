import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumDetailComponent } from './album-detail.component';
import { AlbumDetailRoutingModule } from './album-detail-routing.module';

@NgModule({
  declarations: [AlbumDetailComponent],
  imports: [
    CommonModule,
    AlbumDetailRoutingModule
  ]
})
export class AlbumDetailModule {}
