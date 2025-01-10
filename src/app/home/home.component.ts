import { Component, inject, OnInit } from '@angular/core';
import { Agency } from './model/space.model';
import { SpaceService } from './service/space.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.GetAllAgencies()
  }

  private service: SpaceService = inject(SpaceService)

  agencies: Agency[] = []

  async GetAllAgencies(){
    try {
      this.agencies = await this.service.GetAllAgencies();
    } catch (error) {
      
    }
  }
}
