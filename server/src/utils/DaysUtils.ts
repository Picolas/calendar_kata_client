import {PartialEvent} from '../interfaces/Event';
import {Day} from "../interfaces/Day";

export class DaysUtils {

    static WEEK_LENGTH = 7;
    static CALENDAR_LENGTH = 35;

    static getDays(month: Date, events: PartialEvent[]): Day[] {
        const year = month.getFullYear();
        const monthCp = month.getMonth();
        const firstDayOfMonth = new Date(year, monthCp, 1).getDay();
        const numDays = new Date(year, monthCp + 1, 0).getDate();
        const numDaysPrevMonth = new Date(year, monthCp, 0).getDate();
        const days: Day[] = [];

        // number of previous month
        const daysFromPrevMonth = (firstDayOfMonth + 6) % 7; // start monday

        // add previous month days
        for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
            days.push({
                id: (numDaysPrevMonth - i).toString(),
                date: new Date(year, monthCp - 1, numDaysPrevMonth - i),
                events: [],
                isLastDay: false,
                isToday: false
            });
        }

        // current month days
        for (let i = 1; i <= numDays; i++) {
            days.push({
                id: i.toString(),
                date: new Date(year, monthCp, i),
                events: [],
                isLastDay: false,
                isToday: new Date().toDateString() === new Date(year, monthCp, i).toDateString()
            });
        }

        // add next month days to complete the last week
        while (days.length % DaysUtils.WEEK_LENGTH !== 0) {
            const lastDay = days[days.length - 1].date;
            const nextDay = new Date(lastDay);
            nextDay.setDate(lastDay.getDate() + 1);
            days.push({
                id: days.length.toString(),
                date: nextDay,
                events: [],
                isLastDay: false,
                isToday: false
            });
        }

        // add events to days
        for (const event of events) {
            const eventStartDate = new Date(event.startDate!);
            const eventEndDate = new Date(event.endDate!);

            const normalizedEventStartDate = new Date(eventStartDate.getFullYear(), eventStartDate.getMonth(), eventStartDate.getDate());
            const normalizedEventEndDate = new Date(eventEndDate.getFullYear(), eventEndDate.getMonth(), eventEndDate.getDate());

            for (const day of days) {
                const normalizedDayDate = new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate());
                if (normalizedDayDate >= normalizedEventStartDate && normalizedDayDate <= normalizedEventEndDate) {
                    day.events.push({ ...event, showHeader: false });
                }

                // sort events by date
                day.events.sort((a, b) => {
                    const dateA = new Date(a.startDate!);
                    const dateB = new Date(b.startDate!);
                    if (dateA < dateB) {
                        return -1;
                    } else if (dateA > dateB) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
            }
        }

        // every 7 days = last day of week in calendar
        for (let i = DaysUtils.WEEK_LENGTH - 1; i < days.length; i += DaysUtils.WEEK_LENGTH) {
            days[i].isLastDay = true;
        }

        // group days into weeks and set showHeader for events
        for (let i = 0; i < days.length; i += DaysUtils.WEEK_LENGTH) {
            const week = days.slice(i, i + DaysUtils.WEEK_LENGTH);
            const eventMap = new Map<string, boolean>();

            for (const day of week) {
                for (const event of day.events) {
                    if (event.title && !eventMap.has(event.title)) {
                        event.showHeader = true;
                        eventMap.set(event.title, true);
                    }
                }
            }
        }

        // set showHeader for multiple day events
        for (let i = 0; i < days.length; i += 7) {
            const week = days.slice(i, i + 7);
            const eventMap = new Map<string, boolean>();

            for (const day of week) {
                for (const event of day.events) {
                    if (event.title) {
                        if (!eventMap.has(event.title)) {
                            event.showHeader = true;
                            eventMap.set(event.title, true);
                        } else {
                            event.showHeader = false;
                        }
                    }
                }
            }
        }

        return days;
    }

    static getPeriodDays(month: Date): { startDate: Date, endDate: Date } {
        const year = month.getFullYear();
        const monthCp = month.getMonth();
        const firstDayOfMonth = new Date(year, monthCp, 1).getDay();
        const numDays = new Date(year, monthCp + 1, 0).getDate();
        const daysFromPrevMonth = (firstDayOfMonth + 6) % 7;

        const startDate = new Date(year, monthCp - 1, numDays - daysFromPrevMonth + 1);
        const endDate = new Date(year, monthCp, numDays + (35 - (numDays + daysFromPrevMonth)));

        return {startDate, endDate};
    }

    static getStartOfDay(date: Date): Date {
        date.setHours(0, 0, 0, 0);
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    static getEndOfDay(date: Date): Date {
        date.setHours(23, 59, 59, 999);
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

}