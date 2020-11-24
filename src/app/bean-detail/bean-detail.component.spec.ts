import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeanDetailComponent } from './bean-detail.component';

describe('BeanDetailComponent', () => {
  let component: BeanDetailComponent;
  let fixture: ComponentFixture<BeanDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeanDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
