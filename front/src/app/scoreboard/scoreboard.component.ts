import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  showTeams: boolean = true;
  teams: Object[] = [
    {
      name: "Team HQ",
      captain: "rvh",
      memberCount: 15,
      totalKm: 10.8,
      avgKm: 0.72,
      avgDays: 0.07
    },
    {
      name: "Stardust bikers",
      captain: "johsch",
      memberCount: 9,
      totalKm: 0,
      avgKm: 0,
      avgDays: 0
    },
    {
      name: "De Gudeskønne Landgrevinder",
      captain: "scmat",
      memberCount: 5,
      totalKm: 0,
      avgKm: 0,
      avgDays: 0
    }
  ];

  individuals: Object[] = [
    {
      name: "aBH",
      team: "Team HQ",
      totalKm: 10.8,
      days: 1
    },
    {
      name: "KSA",
      team: null,
      totalKm: 0,
      days: 0
    },
    {
      name: "tmu",
      team: "De Gudeskønne Landgrevinder",
      totalKm: 0,
      days: 0
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
