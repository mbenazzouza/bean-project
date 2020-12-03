import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBeansComponent } from './list-beans.component';

describe('ListBeansComponent', () => {
  let component: ListBeansComponent;
  let fixture: ComponentFixture<ListBeansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBeansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBeansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
