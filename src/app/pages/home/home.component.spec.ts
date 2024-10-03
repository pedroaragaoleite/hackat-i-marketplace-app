import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HomeComponent } from './home.component';
import { Data } from '../../core/interfaces/data';
import { BoredApiService } from '../../core/services/boredApi/bored-api.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { of } from 'rxjs';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let boredApiService: BoredApiService;

  const mockRandomActivity: Data = {
    activity: 'Learn TypeScript',
    type: 'education',
    participants: 1,
    price: 0,
    link: '',
    key: '12345',
    accessibility: "few",
    availability: 1,
    kidFriendly: true,
    duration: "hours"
  };

  beforeEach(async () => {
    // const boredApiServiceSpy = jasmine.createSpyObj('BoredApiService', ['getRandom', 'getActivity', 'resetAllActivities']);

    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HomeComponent], // Import any necessary modules
      providers: [{ provide: BoredApiService }, HttpClient, HttpHandler]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    boredApiService = TestBed.inject(BoredApiService);
  });



  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getRandom on init', () => {
    // Arrange
    spyOn(boredApiService, 'getRandom').and.returnValue(of(mockRandomActivity));

    // Act
    fixture.detectChanges(); // Trigger ngOnInit

    // Assert
    expect(boredApiService.getRandom).toHaveBeenCalled();
    expect(component.isDataFetched()).toBeTrue();
  });


  it('should reset activities when getRandom is called', () => {

    spyOn(boredApiService, 'resetAllActivities').and.callThrough();
    spyOn(boredApiService, 'getRandom').and.returnValue(of(mockRandomActivity));

    // Act
    component.getRandom();

    // Assert
    expect(boredApiService.resetAllActivities).toHaveBeenCalled();
    expect(boredApiService.getRandom).toHaveBeenCalled();
  });

  it('should update currentIndex when nextCard is called', (done) => {
    // Arrange
    component.filterActivities.set([mockRandomActivity, mockRandomActivity]); // Mock two activities
    component.currentIndex.set(0); // Start at index 0

    // Act
    component.nextCard();

    // Assert
    setTimeout(() => {
      expect(component.currentIndex()).toBe(1);
      done();
    }, 1000); // Match the setTimeout in the component
  });

  it('should not increase currentIndex beyond the length of filterActivities', (done) => {
    // Arrange
    component.filterActivities.set([mockRandomActivity]); // Mock a single activity
    component.currentIndex.set(0); // Start at index 0

    // Act
    component.nextCard();

    // Assert
    setTimeout(() => {
      expect(component.currentIndex()).toBe(0); // It should reset to 0
      done();
    }, 1000);
  });

  it('should update currentIndex when previousCard is called', (done) => {
    // Arrange
    component.filterActivities.set([mockRandomActivity, mockRandomActivity]); // Mock two activities
    component.currentIndex.set(1); // Start at index 1

    // Act
    component.previousCard();

    // Assert
    setTimeout(() => {
      expect(component.currentIndex()).toBe(0); // It should go back to 0
      done();
    }, 1000);
  });

  it('should not decrease currentIndex below 0', (done) => {
    // Arrange
    component.filterActivities.set([mockRandomActivity]); // Mock a single activity
    component.currentIndex.set(0); // Start at index 0

    // Act
    component.previousCard();

    // Assert
    setTimeout(() => {
      expect(component.currentIndex()).toBe(0); // It should not go below 0
      done();
    }, 1000);
  });

  it('should toggle isFade when nextCard or previousCard is called', () => {
    // Arrange
    const initialFadeValue = component.isFade();

    // Act
    component.nextCard();

    // Assert
    expect(component.isFade()).toBe(!initialFadeValue); // Should toggle fade

    // Act
    component.previousCard();

    // Assert
    expect(component.isFade()).toBe(initialFadeValue); // Should toggle back
  });
});