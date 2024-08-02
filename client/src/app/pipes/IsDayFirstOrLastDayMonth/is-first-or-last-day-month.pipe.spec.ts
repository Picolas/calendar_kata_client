import { IsFirstOrLastDayMonthPipe } from './is-first-or-last-day-month.pipe';

describe('IsFirstOrLastDayMonthPipe', () => {
  it('create an instance', () => {
    const pipe = new IsFirstOrLastDayMonthPipe();
    expect(pipe).toBeTruthy();
  });
});
