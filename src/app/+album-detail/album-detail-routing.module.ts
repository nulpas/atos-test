import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumDetailComponent } from './album-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AlbumDetailComponent
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class AlbumDetailRoutingModule {}
