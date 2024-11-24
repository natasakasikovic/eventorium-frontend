import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from '../model/category.model';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
  @Input() category: Category
  @Output() edit: EventEmitter<number> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Input() proposalCard: boolean;

  onEdit(): void {
    this.edit.emit(this.category.id);
  }

  onDelete(): void {
    this.delete.emit(this.category.id);
  }
}
