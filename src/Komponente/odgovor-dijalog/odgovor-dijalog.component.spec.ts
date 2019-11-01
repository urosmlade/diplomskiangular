import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdgovorDijalogComponent } from './odgovor-dijalog.component';

describe('OdgovorDijalogComponent', () => {
  let component: OdgovorDijalogComponent;
  let fixture: ComponentFixture<OdgovorDijalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdgovorDijalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdgovorDijalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
