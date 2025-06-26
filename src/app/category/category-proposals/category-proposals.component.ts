import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Category} from '../model/category.model';
import {CategoryService} from '../category.service';
import {Status} from '../model/status-enum-ts';
import {UpdateCategoryProposalComponent} from '../update-category-proposal/update-category-proposal.component';
import {MatDialog} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-category-proposals',
  templateUrl: './category-proposals.component.html',
  styleUrl: './category-proposals.component.css'
})
export class CategoryProposalsComponent implements OnInit {
  categoryProposals: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private toasterService: ToastrService,
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
      error: (error: HttpErrorResponse) => {
        this.toasterService.error(error.error.message, "Failed to update category status");
      }
    });
  }

  openUpdateCategory(category: Category) {
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
      if(id) {
        this.categoryProposals = this.categoryProposals.filter(category => category.id !== id);
      }
    });
  }

  protected readonly Status = Status;

}
