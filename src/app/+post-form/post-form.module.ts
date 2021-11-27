import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostFormComponent } from './post-form.component';
import { PostFormRoutingModule } from './post-form-routing.module';

@NgModule({
  declarations: [PostFormComponent],
  imports: [
    CommonModule,
    PostFormRoutingModule
  ]
})
export class PostFormModule {}
