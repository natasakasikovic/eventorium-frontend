import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PriceListItem} from '../model/price-list-item.model';
import {PriceListService} from '../price-list.service';

@Component({
  selector: 'app-price-list-table',
  templateUrl: './price-list-table.component.html',
  styleUrl: './price-list-table.component.css'
})
export class PriceListTableComponent {
  @Input() items: PriceListItem[] = [];
  @Output() updateItem: EventEmitter<PriceListItem> = new EventEmitter();
  displayedColumns: string[] = ["Name", "Price", "Discount", "Net price", "Action"];


  constructor(
    private priceListService: PriceListService
  ) {
  }

  onDiscountChange(element: PriceListItem): void {
    element.netPrice = element.price - (element.price * element.discount / 100);
  }

  onPriceChange(element: PriceListItem): void {
    element.netPrice = element.price - (element.price * element.discount / 100);
  }

  onSave(element: PriceListItem): void {
    this.updateItem.emit(element);
  }
}
