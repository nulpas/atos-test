import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumDetailComponent } from './album-detail.component';
import { EventsModule, OrderConditionModule, OrderConditionPipe, ToolModule } from '@circe/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SpinnerModule } from '@circe/spinner';
import { ModalModule } from '@circe/modal';

describe('AlbumDetailComponent', () => {
  let component: AlbumDetailComponent;
  let fixture: ComponentFixture<AlbumDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlbumDetailComponent],
      imports: [
        ToolModule.forChild(),
        EventsModule.forChild(),
        HttpClientModule,
        OrderConditionModule,
        RouterTestingModule,
        SpinnerModule,
        ModalModule
      ],
      providers: [
        OrderConditionPipe
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
