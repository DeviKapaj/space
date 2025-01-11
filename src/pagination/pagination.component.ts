import {ChangeDetectionStrategy, Component, computed, EventEmitter, input, Input, output, Output} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgClass],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  currentPage=input<number>(1);
  itemsPerPage=input<number>(1);
  maxPagesToShow=input<number>(1);
  totalItems=input<number>(1);
  pageChange = output<number>();
  totalPages=computed(()=> Math.ceil(this.totalItems() / this.itemsPerPage()))

  visiblePages=computed(()=> {
    const totalPages = this.totalPages();
    const maxPages = this.maxPagesToShow();
    let start = Math.max(this.currentPage() - Math.floor(maxPages / 2), 1);
    let end = Math.min(start + maxPages - 1, totalPages);
    if (end - start < maxPages - 1) {
      start = Math.max(end - maxPages + 1, 1);
    }
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  })

  changePage(page: number) {
    if (page < 1 || page > this.totalPages()) {
      return;
    }
    this.pageChange.emit(page);
  }

}
