import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsListComponent } from './posts-list.component';
import { EventsModule, OrderConditionModule, OrderConditionPipe, ToolModule } from '@circe/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SpinnerModule } from '@circe/spinner';
import { ModalModule } from '@circe/modal';
import { UserInfoModule } from '../user-info/user-info.module';
import { ReactiveFormsModule } from '@angular/forms';


describe('PostListComponent', () => {
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsListComponent],
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
    fixture = TestBed.createComponent(PostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
