import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsListComponent } from './albums-list.component';
import { AlbumsListRoutingModule } from './albums-list-routing.module';

@NgModule({
  declarations: [AlbumsListComponent],
  imports: [
    CommonModule,
    AlbumsListRoutingModule
  ]
})
export class AlbumsListModule {}
