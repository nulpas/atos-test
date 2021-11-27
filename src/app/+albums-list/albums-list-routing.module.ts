import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsListComponent } from './albums-list.component';

const routes: Routes = [
  {
    path: '',
    component: AlbumsListComponent
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class AlbumsListRoutingModule {}
