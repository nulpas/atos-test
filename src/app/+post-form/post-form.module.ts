import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostFormComponent } from './post-form.component';
import { PostFormRoutingModule } from './post-form-routing.module';
import { RouterModule } from '@angular/router';
import { SelectModule } from '@circe/select';
import { FormBehaviorModule } from '@circe/form-behavior';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from '@circe/spinner';

@NgModule({
  declarations: [PostFormComponent],
  imports: [
    CommonModule,
    PostFormRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    SelectModule,
    FormBehaviorModule,
    SpinnerModule
  ]
})
export class PostFormModule {}
