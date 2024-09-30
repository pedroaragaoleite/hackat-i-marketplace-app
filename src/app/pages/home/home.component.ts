import { Component, computed, inject, OnInit } from '@angular/core';
import { BoredApiService } from '../../core/services/boredApi/bored-api.service';
import { Data } from '../../core/interfaces/data';
import { HeaderComponent } from '../../core/components/header/header.component';
import { MenuComponent } from '../../core/components/menu/menu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, MenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private boredService = inject(BoredApiService);
  activity = computed(() => this.boredService.activity())

  random: Data | null = null;

  ngOnInit(): void {
    // this.getRandom();
  }

  getRandom() {
    this.boredService.getRandom().subscribe({
      next: () => {
        if (this.activity()) {
          console.log(this.activity());
          this.random = this.activity();
        }

      },
      error: error => {
        console.log(error);

      }
    })
  }

}
