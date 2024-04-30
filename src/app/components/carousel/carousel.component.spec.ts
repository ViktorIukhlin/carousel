import { MarkupService } from '../../shared/markup.service';
import { TimerService } from '../../shared/timer.service';
import { CarouselComponent } from './carousel.component';
import { ISlide } from './carousel.interface';

describe('CarouselComponent', () => {
  it('should initialize CarouselComponent with slides input', () => {
    // Arrange
    const slides: ISlide[] = [
      {
        id: 1,
        backgroundImage: 'image1.jpg',
        mainImage: 'image1.jpg',
        title: 'Slide 1',
        text: 'Slide 1 content',
        button: {
          text: 'Button 1',
          action: () => {},
        },
      },
      {
        id: 2,
        backgroundImage: 'image2.jpg',
        mainImage: 'image2.jpg',
        title: 'Slide 2',
        text: 'Slide 2 content',
        button: {
          text: 'Button 2',
          action: () => {},
        },
      },
    ];
    const timerService = new TimerService();
    const markupService = new MarkupService();

    // Act
    const carouselComponent = new CarouselComponent(
      timerService,
      markupService
    );
    carouselComponent.slides = slides;
    carouselComponent.ngOnChanges();

    // Assert
    expect(carouselComponent.loading).toBe(false);
    expect(carouselComponent.normalizedSlides).toEqual(slides);
    expect(carouselComponent.currentSlide).toBe(0);
    expect(carouselComponent.currentPosition).toBe(-window.innerWidth);
  });

  it('should block swipe when there is only one slide', () => {
    // Arrange
    const slides: ISlide[] = [
      {
        id: 1,
        backgroundImage: 'image1.jpg',
        mainImage: 'image1.jpg',
        title: 'Slide 1',
        text: 'Slide 1 content',
        button: {
          text: 'Button 1',
          action: () => {},
        },
      },
    ];
    const timerService = new TimerService();
    const markupService = new MarkupService();

    // Act
    const carouselComponent = new CarouselComponent(
      timerService,
      markupService
    );
    carouselComponent.slides = slides;
    carouselComponent.ngOnChanges();

    // Assert
    expect(carouselComponent.blockSwipe).toBe(true);
  });
});
