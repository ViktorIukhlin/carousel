import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ISlide } from './carousel.interface';
import { Observable, Subject, interval } from 'rxjs';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input() public slides: ISlide[] = [];

  public normalizedSlides: ISlide[];

  public animationActive = false;
  public currentSlide: number;
  public currentPosition: number;

  private prevPosition: number;
  private blockSwipe = false;
  public seconds: number = 0;

  constructor() {}

  ngOnInit(): void {
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
    }
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
      this.animationActive = true;
      // Move the closest slide to the border
      this.currentPosition = closestSlide * window.innerWidth;

      // Turn off animation after 300ms
      setTimeout(() => {
        // TODO: I don’t think this is the optimal solution, there should be a way to calculate the exact time
        // At least it doesn’t cause bugs or slowdowns
        this.animationActive = false;
      }, 300);
    }
  }

  trackBy(_: number, slide: ISlide): number {
    return slide.id;
  }

  // This method is needed to add yellow highlighting to certain text
  // Or if we need to add new line to the text
  // TODO: Should be in a separate service
  formatText(text: string) {
    // Here we are trying to find all '\n' symbols and content inside these '** .... **' symbols
    return text.replaceAll(/\\n|\*\*(.*?)\*\*/g, (_, coincidence) => {
      // if this is a '** .... **' symbols then replace them with the span tag
      if (coincidence) {
        return `<span class="yellow">${coincidence}</span>`;
      }
      // if this is a '\n' symbols then return the <br /> tag instead
      return '<br />';
    });
  }

  private moveLastElementToBeginning(): void {
    const lastElement = this.normalizedSlides.pop() as ISlide;
    this.normalizedSlides.unshift(lastElement);
  }

  private moveFirstElementToEnd(): void {
    const firstElement = this.normalizedSlides.shift() as ISlide;
    this.normalizedSlides.push(firstElement);
  }
}
