import { Component } from '@angular/core';
import { News } from '../news/news';

@Component({
  selector: 'app-home',
  imports: [News],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
