import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http';
import { BoredApiService } from './bored-api.service';
import { Data } from '../../interfaces/data';
import { of } from 'rxjs';

describe('BoredApiService', () => {
  let service: BoredApiService;
  let httpMock: HttpTestingController;

  const mockRandomActivity: Data = {
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
  };

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BoredApiService]
    });

    service = TestBed.inject(BoredApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no unmatched requests are outstanding.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a random activity', () => {
    service.getRandom().subscribe();

    const req = httpMock.expectOne('api/random');
    expect(req.request.method).toBe('GET');
    req.flush(mockRandomActivity); // Respond with mock data

    expect(service.activity()).toEqual(mockRandomActivity);
  });

  it('should handle error while fetching random activity', () => {
    spyOn(console, 'error'); // Spy on console error

    service.getRandom().subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
      }
    });

    const req = httpMock.expectOne('api/random');
    req.flush('Something went wrong', { status: 500, statusText: 'Internal Server Error' });

    expect(console.error).toHaveBeenCalledWith('Error fetching random activity', jasmine.anything());
    expect(service.activity()).toBeNull(); // The activity should be null after an error
  });

  it('should fetch activities by type', () => {
    const type = 'education';
    service.getActivity(type).subscribe();

    const req = httpMock.expectOne(`api/filter?type=${type}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockFilteredActivities); // Respond with mock data

    expect(service.filterActivity()).toEqual(mockFilteredActivities);
  });

  it('should handle error while fetching activities by type', () => {
    spyOn(console, 'error'); // Spy on console error

    const type = 'education';
    service.getActivity(type).subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
      }
    });

    const req = httpMock.expectOne(`api/filter?type=${type}`);
    req.flush('Something went wrong', { status: 500, statusText: 'Internal Server Error' });

    expect(console.error).toHaveBeenCalledWith('Error fetching activities', jasmine.anything());
    expect(service.filterActivity()).toBeNull(); // The activities should be null after an error
  });

  it('should reset all activities', () => {
    service.resetAllActivities();
    expect(service.activity()).toBeNull();
    expect(service.filterActivity()).toBeNull();
  });
});