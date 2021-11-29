import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsListComponent } from '../+posts-list/posts-list.component';
import { AlbumsListComponent } from '../+albums-list/albums-list.component';
import { PostFormComponent } from '../+post-form/post-form.component';
import { PostDetailComponent } from '../+post-detail/post-detail.component';
import { AlbumDetailComponent } from '../+album-detail/album-detail.component';

const routes: Routes = [
  {
    path: 'posts',
    component: PostsListComponent,
    loadChildren: () => import('../+posts-list/posts-list.module').then(m => m.PostsListModule)
  },
  {
    path: 'posts/new',
    component: PostFormComponent,
    loadChildren: () => import('../+post-form/post-form.module').then(m => m.PostFormModule)
  },
  {
    path: 'post/:id/edit',
    component: PostFormComponent,
    loadChildren: () => import('../+post-form/post-form.module').then(m => m.PostFormModule)
  },
  {
    path: 'post/:id',
    component: PostDetailComponent,
    loadChildren: () => import('../+post-detail/post-detail.module').then(m => m.PostDetailModule)
  },
  {
    path: 'albums',
    component: AlbumsListComponent,
    loadChildren: () => import('../+albums-list/albums-list.module').then(m => m.AlbumsListModule)
  },
  {
    path: 'album/:id',
    component: AlbumDetailComponent,
    loadChildren: () => import('../+album-detail/album-detail.module').then(m => m.AlbumDetailModule)
  },
  {
    path: '**',
    redirectTo: 'posts',
    pathMatch: 'full'
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class BlogLayoutRoutingModule {}
