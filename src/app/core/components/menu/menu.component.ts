import { Component, computed, EventEmitter, inject, Output, signal } from '@angular/core';
import { BoredApiService } from '../../services/boredApi/bored-api.service';

import { Data } from '../../interfaces/data';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  private boredService = inject(BoredApiService);
  activities = computed(() => this.boredService.filterActivity());
  activityOn = signal<boolean>(false);

  @Output() filterActivity = new EventEmitter<Data[]>();
  @Output() dataFetched = new EventEmitter<boolean>();

  getActivity(type: string) {
    this.boredService.getActivity(type).subscribe({
      next: () => {
        const activityData = this.activities();
        console.log(activityData);
        if (activityData) {
          this.filterActivity.emit(activityData);
          this.dataFetched.emit(true);
        }
      },
      error: error => {
        console.error(error, "Error fecthing requested activity")
        this.dataFetched.emit(true);
      }
    })

  }
}
