import { TimerService } from './timer.service';

describe('TimerService', () => {
  beforeEach(() => {
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });
  it('should start the timer and increment seconds', () => {
    const timerService = new TimerService();
    timerService.startTimer();

    expect(timerService.seconds).toBe(0);

    jasmine.clock().tick(1000);
    expect(timerService.seconds).toBe(1);

    jasmine.clock().tick(2000);
    expect(timerService.seconds).toBe(3);
  });

  it('should handle multiple start/stop/reset calls', () => {
    const timerService = new TimerService();
    timerService.startTimer();

    jasmine.clock().tick(3000);
    expect(timerService.seconds).toBe(3);

    timerService.stopTimer();
    jasmine.clock().tick(2000);
    expect(timerService.seconds).toBe(3);

    timerService.startTimer();
    jasmine.clock().tick(2000);
    expect(timerService.seconds).toBe(5);

    timerService.resetTimer();
    expect(timerService.seconds).toBe(0);
  });
});
