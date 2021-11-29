import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsListComponent } from './albums-list.component';
import { EventsModule, OrderConditionModule, OrderConditionPipe, ToolModule } from '@circe/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SpinnerModule } from '@circe/spinner';
import { ModalModule } from '@circe/modal';
import { UserInfoModule } from '../user-info/user-info.module';
import { ReactiveFormsModule } from '@angular/forms';

describe('AlbumsListComponent', () => {
  let component: AlbumsListComponent;
  let fixture: ComponentFixture<AlbumsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlbumsListComponent],
      imports: [
        ToolModule.forChild(),
        EventsModule.forChild(),
        HttpClientModule,
        OrderConditionModule,
        RouterTestingModule,
        SpinnerModule,
        ModalModule,
        UserInfoModule,
        ReactiveFormsModule
      ],
      providers: [
        OrderConditionPipe
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
