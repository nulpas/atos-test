import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsListRoutingModule } from './posts-list-routing.module';
import { PostsListComponent } from './posts-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBehaviorModule } from '@circe/form-behavior';
import { DropdownModule } from '@circe/dropdown';
import { KeyboardEmitterModule } from '@circe/event-controls';
import { SpinnerModule } from '@circe/spinner';

@NgModule({
  declarations: [PostsListComponent],
  imports: [
    CommonModule,
    PostsListRoutingModule,
    ReactiveFormsModule,
    FormBehaviorModule,
    DropdownModule,
    KeyboardEmitterModule,
    SpinnerModule
  ]
})
export class PostsListModule {}
