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
  @Output() update: EventEmitter<number> = new EventEmitter();
  @Output() accept: EventEmitter<number> = new EventEmitter();
  @Output() decline: EventEmitter<number> = new EventEmitter();
  @Input() proposalCard: boolean;

  onEdit(): void {
    this.edit.emit(this.category.id);
  }

  onUpdate(): void {
    this.update.emit(this.category.id);
  }

  onAccept(): void {
    this.accept.emit(this.category.id);
  }

  onDecline(): void {
    this.decline.emit(this.category.id);
  }

  onDelete(): void {
    this.delete.emit(this.category.id);
  }
}
