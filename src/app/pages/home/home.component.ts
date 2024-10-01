import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { BoredApiService } from '../../core/services/boredApi/bored-api.service';
import { Data } from '../../core/interfaces/data';
import { HeaderComponent } from '../../core/components/header/header.component';
import { MenuComponent } from '../../core/components/menu/menu.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, CommonModule, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('movingForward', [
      state('start', style({ transform: 'translateX(0px)' })),
      state('end', style({ transform: 'translateX(300px)' })),
      transition('start => end', [
        animate('.6s')
      ]),
      transition('end => start', [
        animate('.6s')
      ])
    ]),
    trigger('movingBack', [
      state('start', style({ transform: 'translateX(0)' })),
      state('end', style({ transform: 'translateX(-300px)' })),
      transition('start => end', [
        animate('.6s')
      ]),
      transition('end => start', [
        animate('.6s')
      ])
    ]),
    trigger('fade', [
      state('start', style({ opacity: 1 })),
      state('end', style({ opacity: 0 })),
      transition('start => end', [
        animate('0.5s')
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;
  isMovingFront = signal(true)
  isMovingBack = signal(true)
  isFadding = signal(true);
  isFade = signal(true);

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
          this.boredService.changeActivitiesToNull();
          this.activitiesOn.set(false);

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
    this.isMovingBack.update(value => !value);
    this.isFade.update(value => !value);
    if (this.count() === 0) {
      this.count.set(0)
    } else {

      setTimeout(() => {
        this.count.update(slide => slide - 1)
        this.isMovingBack.set(true);
        this.isFade.set(true);
      }, 1000)
    }
    console.log(this.count());
  }

  nextCard() {
    this.isMovingFront.update(value => !value);
    this.isFade.update(value => !value);

    if (this.count() === this.filterActivities.length) {
      this.count.set(0)
    } else {

      setTimeout(() => {
        this.count.update(slide => slide + 1)
        this.isMovingFront.set(true);
        this.isFade.set(true);
      }, 1000);
      console.log(this.count());

    }
  }

}
