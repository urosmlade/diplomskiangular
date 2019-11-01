import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovakarticadijalogComponent } from './novakarticadijalog.component';

describe('NovakarticadijalogComponent', () => {
  let component: NovakarticadijalogComponent;
  let fixture: ComponentFixture<NovakarticadijalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovakarticadijalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovakarticadijalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
