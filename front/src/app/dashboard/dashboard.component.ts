import { Component, OnInit } from '@angular/core';
import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Http, Response, Headers } from '@angular/http';
import { WebsocketService } from '../core/websocket.service';
import { TripService } from '../core/trip.service';
import { Trip } from '../core/core.models';
import { Subscription } from 'rxjs/Subscription';

const now = new Date();

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [NgbDatepickerConfig]
})
export class DashboardComponent implements OnInit {

  openTripForm: boolean = false;
  datePickerModel: NgbDateStruct = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  distance: number = null;
  busy: Subscription;
  trips: Trip[] = [];

  constructor(config: NgbDatepickerConfig, private http:Http, private tripService: TripService) {
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
    this.busy = this.tripService.getAll().subscribe(
      t => { this.trips = t },
      e => { console.error(e) }
    );
  }

  getDatePickerDate() {
    return this.datePickerModel.year + "-" + this.datePickerModel.month + "-" + this.datePickerModel.day;
  }

  onAddTripSubmit() {
    //this.wsService.create({date: this.getDatePickerDate(), distance: this.distance, user: 1});
    this.busy = this.tripService.save({date: this.getDatePickerDate(), distance: this.distance, user: 1})
    .subscribe(
      (t) => {
        this.trips.splice(locationOf(t, this.trips, tripCompare) + 1, 0, t);
        this.distance = null;
        this.openTripForm = false;
      },
      (e) => console.error(e)
    );
  }

  deleteTrip(trip: Trip) {
    this.busy = this.tripService.delete(trip.id).subscribe(
      r => { this.trips.splice(locationOf(trip, this.trips, tripCompare), 1); },
      e => console.error(e)
    );
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
