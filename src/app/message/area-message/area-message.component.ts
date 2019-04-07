import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-area-message',
  templateUrl: './area-message.component.html',
  styleUrls: ['./area-message.component.css']
})
export class AreaMessageComponent implements OnInit {
  condition : boolean;
  items: number[] = [1, 2, 3, 4];
  ngOnInit() {
    this.condition = true;
  }

}
