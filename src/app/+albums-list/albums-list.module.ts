import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsListComponent } from './albums-list.component';
import { AlbumsListRoutingModule } from './albums-list-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBehaviorModule } from '@circe/form-behavior';
import { DropdownModule } from '@circe/dropdown';
import { KeyboardEmitterModule } from '@circe/event-controls';
import { SpinnerModule } from '@circe/spinner';
import { ModalModule } from '@circe/modal';
import { UserInfoModule } from '../user-info/user-info.module';

@NgModule({
  declarations: [AlbumsListComponent],
  imports: [
    CommonModule,
    AlbumsListRoutingModule,
    ReactiveFormsModule,
    FormBehaviorModule,
    DropdownModule,
    KeyboardEmitterModule,
    SpinnerModule,
    ModalModule,
    UserInfoModule
  ]
})
export class AlbumsListModule {}
