import { Component, OnInit } from '@angular/core';
import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Http, Response, Headers } from '@angular/http';
import { WebsocketService } from '../core/websocket.service';
import { TripService } from '../core/trip.service';
import { Trip } from '../core/core.models';

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
  busy: Promise<any>;
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
    this.tripService
      .getAll()
      .subscribe(
        t => { this.trips = t },
        e => { console.error(e) }
        );
  }

  getDatePickerDate() {
    return this.datePickerModel.year + "-" + this.datePickerModel.month + "-" + this.datePickerModel.day;
  }

  onAddTripSubmit() {
    //this.wsService.create({date: this.getDatePickerDate(), distance: this.distance, user: 1});
    this.tripService.save({date: this.getDatePickerDate(), distance: this.distance, user: 1}).subscribe((t) => {
      this.trips.push(t);
      this.trips = sortTrips(this.trips);
      this.distance = null;
      this.openTripForm = false;
    });
  }
}

function sortTrips(trips: Trip[]): Trip[] {
  trips.sort((a: Trip, b: Trip) => {
    if (a.date < b.date) return 1;
    else if (a.date > b.date) return -1;
    else {
      if (a.last_updated < b.last_updated) return 1;
      else if (a.last_updated > b.last_updated) return -1;
    }
    return 0;
  });
  return trips;
}
