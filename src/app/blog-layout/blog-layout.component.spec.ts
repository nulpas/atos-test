import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogLayoutComponent } from './blog-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { NotificationModule } from '@circe/notification';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderModule } from '../header/header.module';
import { SidebarModule } from '../sidebar/sidebar.module';
import { OrderConditionModule, OrderConditionPipe, ToolModule } from '@circe/core';

describe('BlogLayoutComponent', () => {
  let component: BlogLayoutComponent;
  let fixture: ComponentFixture<BlogLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogLayoutComponent],
      imports: [
        ToolModule.forChild(),
        HttpClientModule,
        NotificationModule.forChild(),
        RouterTestingModule,
        HeaderModule,
        SidebarModule,
        OrderConditionModule
      ],
      providers: [
        OrderConditionPipe
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
