import { Component, input } from '@angular/core';
import { MovieCrew } from '../../models/moviecrew';

@Component({
  selector: 'app-actorcard',
  imports: [],
  templateUrl: './actorcard.html',
  styleUrl: './actorcard.css',
})
export class ActorCard {
  crew = input.required<MovieCrew>();
}
