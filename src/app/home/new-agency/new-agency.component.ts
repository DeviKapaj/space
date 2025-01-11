import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Agency } from '../model/space.model';
import { SpaceService } from '../service/space.service';

@Component({
  selector: 'app-new-agency',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-agency.component.html',
  styleUrl: './new-agency.component.css'
})
export class NewAgencyComponent {

  private fb: FormBuilder = inject(FormBuilder)
  private service: SpaceService = inject(SpaceService)

  @Output() eventButton = new EventEmitter<boolean>()

  newAgency = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    country: ['', Validators.required],
    founding_year: [null as number|null, Validators.required],
    budget: [null as number|null, Validators.required]
  })

  addAgency(){
    const newAgency: Agency = {
      id: this.newAgency.value.id ?? 0,
      name: this.newAgency.value.name ?? '',
      country: this.newAgency.value.country ?? '',
      founding_year: this.newAgency.value.founding_year ?? null,
      budget: this.newAgency.value.budget ?? null
    }

    this.service.addAgency(newAgency).subscribe({
      next: (response) => {
        console.log('Agency added successfully:', response);
        this.newAgency.reset()
        this.eventButton.emit(true)
      },
      error: (err) => {
        console.error('Error adding agency:', err);
      },
    });
  }
}
