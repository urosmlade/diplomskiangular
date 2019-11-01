import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotvrdadijalogComponent } from './potvrdadijalog.component';

describe('PotvrdadijalogComponent', () => {
  let component: PotvrdadijalogComponent;
  let fixture: ComponentFixture<PotvrdadijalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotvrdadijalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotvrdadijalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
