import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { BoredApiService } from '../../core/services/boredApi/bored-api.service';
import { Data } from '../../core/interfaces/data';
import { HeaderComponent } from '../../core/components/header/header.component';
import { MenuComponent } from '../../core/components/menu/menu.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faArrowLeft, faBan } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, CommonModule, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
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

  private boredService = inject(BoredApiService);

  // FontAnswome Icons
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;
  faBan = faBan;
  isFade = signal(true);

  // filterActivities: Data[] = [];
  filterActivities = signal<Data[] | null>(null);
  // random = signal<Data | null>(null);

  random = this.boredService.activity;

  // isActivitiesVisible = signal(false);
  isDataFetched = signal(false);
  isFilteredDataFetched = signal(false);

  currentIndex = signal(0);


  onFilterActivities(activities: Data[] | null) {
    this.filterActivities.set(activities);
    this.isFilteredDataFetched.set(true);
  }

  onFilterData(isFetched: boolean) {
    this.isDataFetched.set(false);
    this.isFilteredDataFetched.set(isFetched)
  }

  ngOnInit(): void {
    this.getRandom();
  }

  getRandom() {
    this.resetActivities();
    this.boredService.getRandom().subscribe({
      next: () => {
        this.isDataFetched.set(true);
      },
      error: error => {
        console.error(error);
        this.isDataFetched.set(true)
      }
    })
  }

  previousCard() {
    this.toggleFade();
    if (this.currentIndex() === 0) {
      this.currentIndex.set(0)
    } else {

      setTimeout(() => {
        this.currentIndex.update(slide => slide - 1)
        this.isFade.set(true);
      }, 1000)
    }
  }

  nextCard() {
    this.toggleFade();

    const currentLength = this.filterActivities()?.length ?? 0;

    if (this.currentIndex() === currentLength - 1) {
      this.currentIndex.set(0)
      console.log(this.currentIndex());

    } else {
      setTimeout(() => {
        this.currentIndex.update(slide => slide + 1)
        this.isFade.set(true);
        console.log(this.currentIndex());
        console.log(this.filterActivities()?.length);


      }, 1000);
    }
  }

  private toggleFade() {
    this.isFade.update(value => !value);
  }

  private resetActivities() {

    this.boredService.resetAllActivities()
    this.filterActivities.set(null);
    this.isDataFetched.set(false);
    this.isFilteredDataFetched.set(false);
  }

}
