import { Component, OnInit } from '@angular/core';
import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Http, Response, Headers } from '@angular/http';
import { Store } from '@ngrx/store';
import { WebsocketService } from '../core/services/websocket.service';
import { TripService } from '../core/services/trip.service';
import { UserService } from '../core/services/user.service';
import { Trip, User } from '../core/core.models';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { getTrips } from '../core/reducers/trip.reducer';

const now = new Date();

interface UserStats {
  totalDistance?: Number;
  numberTrips?: Number;
  cyclingDays?: Number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [NgbDatepickerConfig]
})
export class DashboardComponent implements OnInit {

  openTripForm: boolean;
  datePickerModel: NgbDateStruct;
  distance: number = 0;

  busyTripCard: Subscription;
  busyUserCard: Subscription;
  //trips: Trip[] = [];
  trips: Observable<Trip>;
  userInfo: User = {username: null, full_name: null, email: null, date_joined: null};
  userStats: UserStats = {totalDistance: null, numberTrips: null, cyclingDays: null};

  constructor(config: NgbDatepickerConfig, private http:Http, private tripService: TripService, private userService: UserService, private store: Store<Trip>) {
    this.store.dispatch(getTrips());
    this.trips = store.select("trips");

    this.resetAddTripForm();

    config.minDate = {year: 2017, month: 4, day: 1};
    config.maxDate = {year: 2017, month: 4, day: 31};

    // days that don't belong to current month are not visible
    config.outsideDays = 'hidden';

    // weekends are disabled
    config.markDisabled = (date: NgbDateStruct) => {
      const d = new Date(date.year, date.month - 1, date.day);
      return d.getDay() === 0 || d.getDay() === 6;
    };
  }

  ngOnInit() {
    /*
    this.busyTripCard = this.tripService.getAll().subscribe(
      t => { this.trips = t; this.updateUserStats(); },
      e => { console.error(e) }
    );
    */
    this.busyUserCard = this.userService.get().subscribe(
      u => { this.userInfo = u; console.log(this.userInfo); }
    );
  }

  getDatePickerDate() {
    return new Date(this.datePickerModel.year, this.datePickerModel.month -1, this.datePickerModel.day);
  }

  onAddTripSubmit() {
    //this.wsService.create({date: this.getDatePickerDate(), distance: this.distance, user: 1});
    // TODO: Refactor for redux
    this.busyTripCard = this.tripService.save({date: this.getDatePickerDate(), distance: this.distance, user: 1})
    .subscribe(
      (t) => {
        //this.trips.splice(locationOf(t, this.trips, tripCompare) + 1, 0, t);
        this.updateUserStats();
        this.resetAddTripForm();
      },
      (e) => console.error(e)
    );
  }

  resetAddTripForm() {
      this.distance = 0;
      this.openTripForm = false;
      this.datePickerModel = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  deleteTrip(trip: Trip) {
    this.busyTripCard = this.tripService.delete(trip.id).subscribe(
      r => { this.trips.splice(locationOf(trip, this.trips, tripCompare), 1); this.updateUserStats(); },
      e => console.error(e)
    )
  }

  updateUserStats() {
    this.userStats.numberTrips = this.trips.length;
    this.userStats.totalDistance = this.trips.reduce((prevVal, currentObj) => { console.log(currentObj); return prevVal + currentObj.distance; }, 0);
    let cyclingDates: Date[] = [];
    this.userStats.cyclingDays = this.trips.reduce((prevVal, currentObj) => {
      console.log(cyclingDates);
      console.log(cyclingDates.indexOf(currentObj.date));
      if (cyclingDates.indexOf(currentObj.date) > -1) {
        return prevVal;
      } else {
        cyclingDates.push(currentObj.date);
        return prevVal + 1;
      }
    }, 0);
  }
}

function locationOf(element, array, comparer, start?, end?) {
    if (array.length === 0)
        return -1;

    start = start || 0;
    end = end || array.length;
    var pivot = (start + end) >> 1;  // should be faster than dividing by 2

    var c = comparer(element, array[pivot]);
    if (end - start <= 1) return c == -1 ? pivot - 1 : pivot;

    switch (c) {
        case -1: return locationOf(element, array, comparer, start, pivot);
        case 0: return pivot;
        case 1: return locationOf(element, array, comparer, pivot, end);
    };
};

const tripCompare = function(a: Trip, b: Trip) {
  if (a.date < b.date) return 1;
  else if (a.date > b.date) return -1;
  else {
    if (a.last_updated < b.last_updated) return 1;
    else if (a.last_updated > b.last_updated) return -1;
  }
  return 0;
}
