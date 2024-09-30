import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { BoredApiService } from '../../core/services/boredApi/bored-api.service';
import { Data } from '../../core/interfaces/data';
import { HeaderComponent } from '../../core/components/header/header.component';
import { MenuComponent } from '../../core/components/menu/menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  filterActivities: Data[] = [];
  private boredService = inject(BoredApiService);

  activity = computed(() => this.boredService.activity());
  activityOn = signal(false);
  activitiesOn = signal(false);

  random: Data | null = null;

  onFilterActivities(activities: any) {
    this.activitiesOn.set(true);
    this.filterActivities = activities;
    console.log(this.filterActivities);
  }

  ngOnInit(): void {

  }

  getRandom() {
    this.boredService.getRandom().subscribe({
      next: () => {
        if (this.activity()) {
          console.log(this.activity());
          this.random = this.activity();
          this.activityOn.set(true);
        }

      },
      error: error => {
        console.log(error);

      }
    })
  }

}
