import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Http, Response, Headers } from '@angular/http';
import { Store } from '@ngrx/store';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { WebsocketService } from '../shared/services/websocket.service';
import { TripService } from '../shared/services/trip.service';
import { UserService } from '../shared/services/user.service';
import { Trip, User } from '../shared/models';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { getTrips, addTrip, deleteTrip } from '../shared/reducers/trip.reducer';

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

  tripsPending: Observable<boolean>;
  tripsBusy: Subscription;

  deleteError: Observable<string>;

  busyUserCard: Subscription;
  trips: Observable<Trip[]>;
  userInfo: User = {username: null, full_name: null, email: null, date_joined: null};
  userStats: UserStats = {totalDistance: null, numberTrips: null, cyclingDays: null};

  constructor(config: NgbDatepickerConfig, private http:Http, private userService: UserService, private store: Store<any>, public toastr: ToastsManager) {
    this.store.dispatch(getTrips());

    this.trips = this.store.select((state) => {
      if (state.tripReducer == undefined) return undefined;
      return state.tripReducer.trips;
    });

    this.tripsPending = this.store.select((state) => {
      if (state.tripReducer == undefined) return undefined;
      return state.tripReducer.pending;
    });

    this.deleteError = this.store.select((state) => {
      if (state.tripReducer == undefined) return undefined;
      return state.tripReducer.deleteError;
    });

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

  ngOnDestroy() {
    this.tripsBusy && this.tripsBusy.unsubscribe();
  }

  ngOnInit() {
    this.tripsPending
      .subscribe((isLoading) => {
        if (isLoading) {
          this.tripsBusy = new Subscription();
        } else if (this.tripsBusy && !isLoading) {
          this.resetAddTripForm(); // TODO: Don't close on error, show validation error on input field or error toast
          this.tripsBusy.unsubscribe();
        }
      });
    this.deleteError.subscribe((error) => {
      if (error) {
        console.error(error);
        this.toastr.error(`Error message: ${error}`, 'Error while deleting trip');
      }});
    this.busyUserCard = this.userService.get().subscribe(
      u => { this.userInfo = u; console.log(this.userInfo); }
    );
  }

  getDatePickerDate() {
    return new Date(this.datePickerModel.year, this.datePickerModel.month -1, this.datePickerModel.day);
  }

  onAddTripSubmit() {
    //thiswsService.create({date: this.getDatePickerDate(), distance: this.distance, user: 1});
    this.store.dispatch(addTrip({date: this.getDatePickerDate(), distance: this.distance, user: 1}));
  }

  resetAddTripForm() {
      this.distance = 0;
      this.openTripForm = false;
      this.datePickerModel = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  deleteTrip(trip: Trip) {
    this.store.dispatch(deleteTrip(trip));
  }

  updateUserStats() {
    /*
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
    */
  }

  debugInfo() {
    console.log(this.trips);
    this.trips.forEach(element => {
      console.log(element);
    });
    this.trips.subscribe((t) => console.log(t));
  }
}

