import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-service-filter',
  templateUrl: './service-filter.component.html',
  styleUrl: './service-filter.component.css'
})
export class ServiceFilterComponent {
  @Output() closeFilter: EventEmitter<void> = new EventEmitter();

  onClose(): void {
    this.closeFilter.emit();
  }
}
