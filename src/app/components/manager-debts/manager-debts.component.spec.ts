import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDebtsComponent } from './manager-debts.component';

describe('ManagerDebtsComponent', () => {
  let component: ManagerDebtsComponent;
  let fixture: ComponentFixture<ManagerDebtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerDebtsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerDebtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
