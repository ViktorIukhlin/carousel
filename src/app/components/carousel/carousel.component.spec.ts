import { CarouselComponent } from './carousel.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselComponent],
      imports: [],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselComponent);

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
