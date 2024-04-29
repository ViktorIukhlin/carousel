import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ISlide } from './components/carousel/carousel.interface';
import { ComponentsModule } from './components/components.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [ComponentsModule, RouterOutlet],
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public slides: ISlide[] = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
  ngOnInit(): void {
    // Hack for iOS Safari address bar scroll
    if (
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i)
    ) {
      // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
      const vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  }
}
