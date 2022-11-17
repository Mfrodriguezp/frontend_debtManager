import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersManagerComponent } from './customers-manager.component';

describe('CustomersManagerComponent', () => {
  let component: CustomersManagerComponent;
  let fixture: ComponentFixture<CustomersManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
