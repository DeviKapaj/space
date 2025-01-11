import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Agency } from './model/space.model';
import { SpaceService } from './service/space.service';
import { CommonModule } from '@angular/common';
import { NewAgencyComponent } from "./new-agency/new-agency.component";
import { PaginationComponent } from "../../pagination/pagination.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, NewAgencyComponent, PaginationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.GetAllAgencies()
  }

  private service: SpaceService = inject(SpaceService)

  agencies: Agency[] = []
  currentPage = 1;
  itemsPerPage = 5;
  maxPagesToShow = 3;
  paginatedAgencies: Agency[] = [];
  filteredAgencies: Agency[] = []

  async GetAllAgencies(){
    try {
      await this.service.GetAllAgencies().then((response) => {
        this.agencies = response;
        this.filteredAgencies = [...this.agencies];
        this.paginateItem(this.filteredAgencies)
      });
    } catch (error) {
      
    }
  }

  async deleteAgency(id: number){
    try {
      await this.service.deleteAgency(id).then(() => {
        this.GetAllAgencies()
      })
    } catch (error) {
      
    }
  }

  onRefresh(event: boolean){
    if(event){
      this.GetAllAgencies()
    }
  }

  paginateItem(agencies: Agency[]){
    const startIndex = (this.currentPage - 1)* this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedAgencies = agencies.slice(startIndex, endIndex)
  }

  onPageChange(page: number){
    this.currentPage = page
    this.paginateItem(this.filteredAgencies)
  }
}
