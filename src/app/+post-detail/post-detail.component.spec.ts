import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailComponent } from './post-detail.component';
import { EventsModule, OrderConditionModule, OrderConditionPipe, ToolModule } from '@circe/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SpinnerModule } from '@circe/spinner';
import { UserInfoModule } from '../user-info/user-info.module';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      imports: [
        ToolModule.forChild(),
        EventsModule.forChild(),
        HttpClientModule,
        OrderConditionModule,
        RouterTestingModule,
        SpinnerModule,
        UserInfoModule
      ],
      providers: [
        OrderConditionPipe
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
