import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullSizeImageDisplayComponent } from './full-size-image-display.component';

describe('FullSizeImageDisplayComponent', () => {
  let component: FullSizeImageDisplayComponent;
  let fixture: ComponentFixture<FullSizeImageDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullSizeImageDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullSizeImageDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
