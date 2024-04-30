# Carousel

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.

https://viktoriukhlin.github.io/carousel/ - GitHub Pages link

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Main goal

The main task of this homework was to create a carousel with three slides.

**Requirements:**

- support mobile screens (<600px) only, no desktop ✅
- one slide utilizes 100vw ✅
- should be possible to change slides by swiping ✅
- slides data should be abstracted, not hardcoded ✅
- slide has background image, main image, title, text and button ✅
- output: repository on github ✅

**Optional:**

- timer to change slides every 10 seconds ✅
- prevent vertical scrolling while swiping ✅ (I've used - **touch-action: pan-y**, but there is still an option to swipe diagonally at the beginning )
- simulate loading from API ✅(Added spinner and loading state)

**Additionally:**

- added the ability to add more slides
- if there is one slide in the array, the carousel simply displays the slide without swiping
- two slides also swipe without problems
- added MarkupService service for highlighting part of the text in yellow and in the future for adding line breaks

## How it works on different devices

**Desctop mobile - Chrome** <br/>
https://drive.google.com/file/d/1IFWHNx1oWsMcS1b5ranThM3xmQg991-u/view?usp=sharing

**iOS real device - Safari** <br/>
https://drive.google.com/file/d/1-F0l4utQbPQOR1C-f8WxATa3qCE9xp8A/view?usp=sharing

**Android real device - Chrome** <br/>
https://drive.google.com/file/d/18HmsuNgb_NsHTopcabACGKMboP1Kmugh/view?usp=sharing
