import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Output() searcher: EventEmitter<string> = new EventEmitter();
  searchForm: FormGroup = new FormGroup({
    keyword: new FormControl("")
  });

  onClick(): void {
    this.searcher.emit(this.searchForm.value.keyword);
  }
}
