import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { BoredApiService } from '../../core/services/boredApi/bored-api.service';
import { Data } from '../../core/interfaces/data';
import { HeaderComponent } from '../../core/components/header/header.component';
import { MenuComponent } from '../../core/components/menu/menu.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, CommonModule, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;

  filterActivities: Data[] = [];
  private boredService = inject(BoredApiService);

  activity = computed(() => this.boredService.activity());
  activityOn = signal(false);
  activitiesOn = signal(false);

  count = signal(0);

  random: Data | null = null;

  onFilterActivities(activities: any) {
    this.boredService.changeActivityToNull();
    this.activityOn.set(false);

    this.activitiesOn.set(true);
    this.filterActivities = activities;
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

  previousCard() {
    if (this.count() === 0) {
      this.count.set(0)
    } else {
      this.count.update(slide => slide - 1)
    }
  }

  nextCard() {
    if (this.count() === this.filterActivities.length) {
      this.count.set(0)
    } else {
      this.count.update(slide => slide + 1)
      console.log(this.count());

    }
  }

}
