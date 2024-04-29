import { Injectable } from '@angular/core';
import { Subject, Observable, interval } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  public timer$: Observable<number>;
  private destroy$: Subject<void> = new Subject<void>();

  private _seconds: number = 0;

  constructor() {
    this.timer$ = interval(1000).pipe(
      takeUntil(this.destroy$),
      map(() => this.seconds)
    );
  }

  get seconds(): number {
    return this._seconds;
  }

  set seconds(value: number) {
    this._seconds = value;
  }

  startTimer(): void {
    this.timer$.subscribe(() => {
      this.seconds++;
    });
  }

  stopTimer(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  resetTimer(): void {
    this.seconds = 0;
  }
}
