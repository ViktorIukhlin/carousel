import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { ISlide } from './carousel.interface';
import { Subscription } from 'rxjs';
import { TimerService } from '../../shared/timer.service';
import { MarkupService } from '../../shared/markup.service';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnChanges, OnDestroy {
  @Input() public slides: ISlide[] = [];

  public normalizedSlides: ISlide[];

  public loading = true;
  public animationActive = false;
  public currentSlide: number;
  public currentPosition: number;

  public seconds: number = 0;
  public blockSwipe = false;

  private prevPosition: number;

  private timerSubscription: Subscription;
  private automaticScrollingSeconds = 10;
  private initialized = false;

  constructor(
    public timerService: TimerService,
    public markupService: MarkupService
  ) {}

  ngOnChanges(): void {
    if (this.slides.length && !this.initialized) this.sliderInitialization();
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
    this.timerService.stopTimer();
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    if (this.blockSwipe) return;
    // Save the first touch as the previous position so that there is a starting point
    this.prevPosition = event.touches[0].clientX;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (this.blockSwipe) return;

    this.timerService.resetTimer();

    const userPosition = event.touches[0].clientX;
    const difference = Math.abs(this.prevPosition - userPosition);

    // Determine in which direction the user is pointing his finger
    // And move the slides in that direction
    if (this.prevPosition < userPosition) {
      this.currentPosition += difference;
    } else if (this.prevPosition > userPosition) {
      this.currentPosition -= difference;
    }

    // Save the last position of the user's finger
    this.prevPosition = userPosition;

    // If we have reached a new slide,
    // we will activate moving the first element forward and shifting the currentPosition to the starting point
    if (this.currentPosition < -window.innerWidth * 2) {
      this.moveFirstElementToEnd();
      this.currentPosition = -window.innerWidth;
    }

    // The same action only in the other direction
    if (this.currentPosition > 0) {
      this.moveLastElementToBeginning();
      this.currentPosition = -window.innerWidth;
    }
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd() {
    if (this.blockSwipe) return;

    if (this.currentPosition % window.innerWidth) {
      // Finding the slide closest to the border
      const closestSlide = Math.round(this.currentPosition / window.innerWidth);

      // Activate animation at the moment of automatic scrolling
      this.handleAnimation();
      // Move the closest slide to the border
      this.currentPosition = closestSlide * window.innerWidth;
    }
  }

  trackBy(_: number, slide: ISlide): number {
    return slide.id;
  }

  // This method is needed to add yellow highlighting to certain text
  // Or if we need to add new line to the text
  formatText(text: string) {
    return this.markupService.formatText(text);
  }

  private sliderInitialization(): void {
    this.loading = false;
    this.initialized = true;

    const length = this.slides.length;
    this.currentSlide = 0;

    this.normalizedSlides = this.slides;

    // If we have only 1 slide, then we turn off the carousel functionality
    if (length <= 1) {
      this.blockSwipe = true;
    } else {
      // Not the best solution, but it covers a case with two slides
      // TODO: Find a better solution
      if (length === 2) {
        this.normalizedSlides.push(this.slides[0], this.slides[1]);
      }

      // Start position
      this.currentPosition = -window.innerWidth;

      this.moveLastElementToBeginning();

      // Timer functionality
      this.timerService.startTimer();

      this.timerSubscription = this.timerService.timer$.subscribe((seconds) => {
        this.seconds = seconds;

        if (seconds === this.automaticScrollingSeconds) {
          this.handleAutomaticScroll();
        }
      });
    }
  }

  private handleAutomaticScroll(): void {
    // Activate the animation and reset the timer
    this.handleAnimation();
    this.currentPosition = -window.innerWidth * 2;
    this.timerService.resetTimer();

    // After the animation is over, we move the elements
    setTimeout(() => {
      this.moveFirstElementToEnd();
      this.currentPosition = -window.innerWidth;
    }, 300);
  }

  private moveLastElementToBeginning(): void {
    const lastElement = this.normalizedSlides.pop() as ISlide;
    this.normalizedSlides.unshift(lastElement);
  }

  private moveFirstElementToEnd(): void {
    const firstElement = this.normalizedSlides.shift() as ISlide;
    this.normalizedSlides.push(firstElement);
  }

  private handleAnimation(): void {
    // Activate animation at the moment of automatic scrolling
    this.animationActive = true;

    // Turn off animation after 300ms
    setTimeout(() => {
      // TODO: I don’t think this is the optimal solution, there should be a way to calculate the exact time
      // At least it doesn’t cause bugs or slowdowns
      this.animationActive = false;
    }, 300);
  }
}
