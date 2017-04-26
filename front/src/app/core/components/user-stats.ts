import { Component, Input } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'user-stats',
  template: `
    <div class="card dashboard-card">
      <div class="card-header">
        {{header}}
      </div>

      <div class="card-block">
        <table class="table table-hover">
          <thead>
          </thead>
          <tbody >
            <tr>
              <td>Full name</td>
              <td>{{userInfo.full_name}}</td>
            </tr>
            <tr>
              <td>Total distance</td>
              <td>{{userStats.totalDistance}}</td>
            </tr>
            <tr>
              <td>Number of trips</td>
              <td>{{userStats.numberTrips}}</td>
            </tr>
            <tr>
              <td>Cycling days</td>
              <td>{{userStats.cyclingDays}}</td>
            </tr>
            <tr>
              <td>Team</td>
              <td>{{userInfo.team}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserStatsComponent {
  @Input() header;
  @Input() userInfo;
  @Input() userStats;
}
