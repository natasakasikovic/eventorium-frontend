import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsFilterDialogComponent } from './products-filter-dialog.component';

describe('ProductsFilterDialogComponent', () => {
  let component: ProductsFilterDialogComponent;
  let fixture: ComponentFixture<ProductsFilterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsFilterDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
