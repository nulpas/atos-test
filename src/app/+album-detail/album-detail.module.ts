import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumDetailComponent } from './album-detail.component';
import { AlbumDetailRoutingModule } from './album-detail-routing.module';
import { RouterModule } from '@angular/router';
import { SpinnerModule } from '@circe/spinner';
import { TooltipModule } from '@circe/tooltip';
import { ModalModule } from '@circe/modal';

@NgModule({
  declarations: [AlbumDetailComponent],
  imports: [
    CommonModule,
    AlbumDetailRoutingModule,
    RouterModule,
    SpinnerModule,
    TooltipModule,
    ModalModule
  ]
})
export class AlbumDetailModule {}
