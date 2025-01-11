import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Category} from '../model/category.model';
import {CategoryService} from '../category.service';
import {Status} from '../model/status-enum-ts';
import {UpdateCategoryProposalComponent} from '../update-category-proposal/update-category-proposal.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-category-proposals',
  templateUrl: './category-proposals.component.html',
  styleUrl: './category-proposals.component.css'
})
export class CategoryProposalsComponent implements OnInit {
  categoryProposals: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.categoryService.getAllProposals().subscribe({
      next: (categories: Category[]) => {
        this.categoryProposals.push(...categories);
      }
    });
  }

  updateCategoryStatus(id: number, status: Status): void {
    this.categoryService.updateCategoryStatus(id, status).subscribe({
      next: ((category: Category) => {
        this.categoryProposals = this.categoryProposals.filter(proposal => proposal.id !== category.id);
      }),
      error: (err: Error) => {
        console.error(err);
      }
    });
  }

  protected readonly Status = Status;

  openUpdateCategory(category: Category) {
    console.log(category);
    const dialogRef = this.dialog.open(UpdateCategoryProposalComponent, {
      width: '450px',
      height: 'auto',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      data: {
        category: category
      }
    });

    dialogRef.afterClosed().subscribe((id: number) => {
      this.categoryProposals = this.categoryProposals.filter(category => category.id !== id);
      dialogRef.close();
    });
  }
}
