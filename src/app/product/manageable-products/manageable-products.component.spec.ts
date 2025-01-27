import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageableProductsComponent } from './manageable-products.component';

describe('ManageableProductsComponent', () => {
  let component: ManageableProductsComponent;
  let fixture: ComponentFixture<ManageableProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageableProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageableProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
