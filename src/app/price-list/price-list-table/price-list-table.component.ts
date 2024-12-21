import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {PriceListItem} from '../model/price-list-item.model';

@Component({
  selector: 'app-price-list-table',
  templateUrl: './price-list-table.component.html',
  styleUrl: './price-list-table.component.css'
})
export class PriceListTableComponent {
  @Input() items: PriceListItem[] = [];
  displayedColumns: string[] = ["Name", "Price", "Discount", "Net price", "Action"];

  onDiscountChange(element: PriceListItem): void {
    element.netPrice = element.price - (element.price * element.discount / 100);
  }

  onPriceChange(element: PriceListItem): void {
    element.netPrice = element.price - (element.price * element.discount / 100);
  }

  onSave(element: PriceListItem): void {

  }
}
