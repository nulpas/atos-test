import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailComponent } from './post-detail.component';
import { PostDetailRoutingModule } from './post-detail-routing.module';
import { RouterModule } from '@angular/router';
import { SpinnerModule } from '@circe/spinner';
import { UserInfoModule } from '../user-info/user-info.module';

@NgModule({
  declarations: [PostDetailComponent],
  imports: [
    CommonModule,
    PostDetailRoutingModule,
    RouterModule,
    SpinnerModule,
    UserInfoModule
  ]
})
export class PostDetailModule {}
