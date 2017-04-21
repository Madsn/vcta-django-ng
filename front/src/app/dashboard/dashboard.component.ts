import { Component, OnInit } from '@angular/core';
import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Http, Response, Headers } from '@angular/http';

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
  distance: number = 0;
  busy: Promise<any>;

  constructor(config: NgbDatepickerConfig, private http:Http) {
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
  }

  getDatePickerDate() {
    return this.datePickerModel.year + "-" + this.datePickerModel.month + "-" + this.datePickerModel.day;
  }

  onAddTripSubmit() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.busy = this.http.post('http://localhost:8000/api/trip/', JSON.stringify({date: this.getDatePickerDate(), distance: this.distance, user: 1}), { headers: headers })
      .toPromise();
    this.busy.then((x) => {
        console.log(x);
        this.openTripForm = false;
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
