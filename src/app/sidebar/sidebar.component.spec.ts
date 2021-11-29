import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { EventsModule, OrderConditionModule, OrderConditionPipe, ToolModule } from '@circe/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [
        ToolModule.forChild(),
        EventsModule.forChild(),
        HttpClientModule,
        OrderConditionModule,
        RouterTestingModule
      ],
      providers: [
        OrderConditionPipe
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
