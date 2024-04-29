import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ISlide } from './components/carousel/carousel.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public slides: ISlide[] = [
    {
      backgroundImage: 'winzup-bg-mob.webp',
      mainImage: 'winzup_mob.png',
      title: 'WinzUp Loyalty Program',
      text: 'Get up to **35% in rewards:** daily rakeback, weekly cashback and level-up bonuses',
      button: {
        text: 'Join now',
        action: () => {},
      },
    },
    {
      backgroundImage: 'ValentinesFortuneDrops_mob-bg.png',
      mainImage: 'ValentinesFortuneDrops_mob-pic.png',
      title: "Valentine's Fortune Drops",
      text: 'Trigger random prizes and win a share of **€30,000**!',
      button: {
        text: 'Learn more',
        action: () => {},
      },
    },
    {
      backgroundImage: 'wheel-mob-bg.webp',
      mainImage: 'wheel-mob.png',
      title: 'Wheel of Winz',
      text: 'Spin the wheel to win up to **€15,000** weekly',
      button: {
        text: 'Spin now',
        action: () => {},
      },
    },
  ];
}
