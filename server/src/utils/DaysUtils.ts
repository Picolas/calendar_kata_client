import {Day} from "../interfaces/Day";
import {EventDto} from "../dtos/EventDto";

export class DaysUtils {

    static WEEK_LENGTH = 7;

    static getDays(month: Date, events: EventDto[]): Day[] {
        const year = month.getFullYear();
        const monthCp = month.getMonth();
        const firstDayOfMonth = new Date(Date.UTC(year, monthCp, 1));
        const lastDayOfMonth = new Date(Date.UTC(year, monthCp + 1, 0));
        const numDays = lastDayOfMonth.getDate();
        const daysFromPrevMonth = (firstDayOfMonth.getUTCDay() + 6) % 7; // start monday

        const days: Day[] = [];
        const today = new Date();
        const todayString = today.toDateString();

        // add days from previous month
        for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
            const date = new Date(Date.UTC(year, monthCp - 1, new Date(Date.UTC(year, monthCp, 0)).getDate() - i));
            days.push(DaysUtils.createDay(date, false, todayString));
        }

        // add days from current month
        for (let i = 1; i <= numDays; i++) {
            const date = new Date(Date.UTC(year, monthCp, i));
            days.push(DaysUtils.createDay(date, true, todayString));
        }

        // add days from next month
        while (days.length % DaysUtils.WEEK_LENGTH !== 0) {
            const date = new Date(Date.UTC(year, monthCp + 1, days.length - numDays - daysFromPrevMonth + 1));
            days.push(DaysUtils.createDay(date, false, todayString));
        }

        // add events to days
        const eventMap = new Map<string, EventDto[]>();
        events.forEach(event => {
            const start = new Date(event.startDate!);
            const end = new Date(event.endDate!);
            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                // date key
                const key = d.toISOString().split('T')[0];
                if (!eventMap.has(key)) {
                    eventMap.set(key, []);
                }
                eventMap.get(key)!.push({ ...event });
            }
        });

        // sort events by start date
        days.forEach(day => {
            const key = day.date.toISOString().split('T')[0];
            if (eventMap.has(key)) {
                day.events = eventMap.get(key)!.sort((a, b) =>
                    new Date(a.startDate!).getTime() - new Date(b.startDate!).getTime()
                );
            }
        });

        return days;
    }

    static createDay(date: Date, isCurrentMonth: boolean, todayString: string): Day {
        return {
            id: date.getDate().toString(),
            date,
            events: [],
            isLastDay: false,
            isToday: date.toDateString() === todayString,
        }
    }


    static getPeriodDays(month: Date): { startDate: Date, endDate: Date } {
        const year = month.getFullYear();
        const monthIndex = month.getMonth();

        // first day of month
        const firstDayOfMonth = new Date(Date.UTC(year, monthIndex, 1));

        // last day of month
        const lastDayOfMonth = new Date(Date.UTC(year, monthIndex + 1, 0));

        // calculate first day of week
        const firstDayOfWeek = (firstDayOfMonth.getUTCDay() + 6) % 7;

        // calculate the last day of week
        const lastDayOfWeek = (lastDayOfMonth.getUTCDay() + 6) % 7;

        // get complete week at start
        const startDate = new Date(Date.UTC(year, monthIndex, 1 - firstDayOfWeek));

        // get complete week at end
        const endDate = new Date(Date.UTC(year, monthIndex, lastDayOfMonth.getUTCDate() + (6 - lastDayOfWeek)));

        return { startDate, endDate };
    }
}
