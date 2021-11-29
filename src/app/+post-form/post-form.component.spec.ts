import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFormComponent } from './post-form.component';
import { EventsModule, OrderConditionModule, OrderConditionPipe } from '@circe/core';
import { HttpClientModule } from '@angular/common/http';
import { NotificationModule } from '@circe/notification';
import { RouterTestingModule } from '@angular/router/testing';
import { SpinnerModule } from '@circe/spinner';
import { ReactiveFormsModule } from '@angular/forms';

describe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostFormComponent],
      imports: [
        EventsModule.forChild(),
        HttpClientModule,
        OrderConditionModule,
        NotificationModule.forChild(),
        RouterTestingModule,
        SpinnerModule,
        ReactiveFormsModule
      ],
      providers: [
        OrderConditionPipe
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
