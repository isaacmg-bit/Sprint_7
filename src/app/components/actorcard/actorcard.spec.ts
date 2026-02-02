import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActorCard } from './actorcard';

describe('ActorCard', () => {
  let component: ActorCard;
  let fixture: ComponentFixture<ActorCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActorCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ActorCard);

    fixture.componentRef.setInput('crew', {
      cast: [],
      crew: [],
    });

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive and store crew input', () => {
    const mockCrew = {
      cast: [{ id: 1, name: 'Clin Isbu', character: 'Vaquero enfadao' }],
      crew: [{ id: 2, name: 'Estanli Cubrip', job: 'Director' }],
    };

    fixture.componentRef.setInput('crew', mockCrew);
    fixture.detectChanges();

    expect(component.crew()).toEqual(mockCrew);
  });
});
