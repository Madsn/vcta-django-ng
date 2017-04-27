import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../shared/services/websocket.service';

@Component({
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  title = 'Hero component';

  ngOnInit() {
  }

  constructor(private wsService: WebsocketService) { }


  clicked = function() {
    this.wsService.clicked();
  }
}
