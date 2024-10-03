import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Data } from '../../interfaces/data';
import { BoredApiService } from '../../services/boredApi/bored-api.service';
import { of } from 'rxjs';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let boredApiService: jasmine.SpyObj<BoredApiService>;
  // let boredApiService: BoredApiService;


  const mockFilteredActivities: Data[] = [
    {
      activity: 'Learn Angular',
      type: 'education',
      participants: 1,
      price: 0,
      link: '',
      key: '123456',
      accessibility: "few",
      availability: 1,
      kidFriendly: true,
      duration: "hours"
    },
    {
      activity: 'Read a book',
      type: 'education',
      participants: 1,
      price: 0,
      link: '',
      key: '654321',
      accessibility: "few",
      availability: 1,
      kidFriendly: false,
      duration: "minutes"
    }
  ];

  beforeEach(async () => {
    const boredApiServiceSpy = jasmine.createSpyObj('BoredApiService', ['getActivity', 'filterActivity']);

    await TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [{ provide: BoredApiService, useValue: boredApiServiceSpy }, HttpClient, HttpHandler]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    boredApiService = TestBed.inject(BoredApiService) as jasmine.SpyObj<BoredApiService>;


    spyOn(component.filterActivity, 'emit');
    spyOn(component.dataFetched, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getActivity and emit events', () => {
    boredApiService.getActivity.and.returnValue(of(null));
    boredApiService.filterActivity.and.returnValue(mockFilteredActivities);

    // Act
    component.getActivity('education');

    // Assert
    expect(boredApiService.getActivity).toHaveBeenCalledWith('education');
    expect(component.filterActivity.emit).toHaveBeenCalledWith(mockFilteredActivities);
    expect(component.dataFetched.emit).toHaveBeenCalledWith(true);
  })

  it('should call getActivity and emit true even if here is no data', () => {
    boredApiService.getActivity.and.returnValue(of(null));
    boredApiService.filterActivity.and.returnValue(null);

    // Act
    component.getActivity('education');

    // Assert
    expect(boredApiService.getActivity).toHaveBeenCalledWith('education');
    expect(component.filterActivity.emit).toHaveBeenCalledWith(null);
    expect(component.dataFetched.emit).toHaveBeenCalledWith(true);
  });
});
