import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedAndReservedComponent } from './purchased-and-reserved.component';

describe('PurchasedAndReservedComponent', () => {
  let component: PurchasedAndReservedComponent;
  let fixture: ComponentFixture<PurchasedAndReservedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchasedAndReservedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasedAndReservedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
