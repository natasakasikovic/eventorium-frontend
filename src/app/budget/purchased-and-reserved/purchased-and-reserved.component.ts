import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../product/model/product.model';
import {BudgetService} from '../budget.service';

@Component({
  selector: 'app-purchased-and-reserved',
  templateUrl: './purchased-and-reserved.component.html',
  styleUrl: './purchased-and-reserved.component.css'
})
export class PurchasedAndReservedComponent {
  @Input() purchasedProducts: Product[];
}
