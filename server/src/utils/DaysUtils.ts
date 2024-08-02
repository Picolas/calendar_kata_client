import {PartialEvent} from '../interfaces/Event';
import {Day} from "../interfaces/Day";

export class DaysUtils {

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

        // number of next month
        const remainingDays = 35 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            days.push({
                id: i.toString(),
                date: new Date(year, monthCp + 1, i),
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
            }
        }

        // every 7 days = last day of week in calendar
        for (let i = 6; i < days.length; i += 7) {
            days[i].isLastDay = true;
        }

        // group days into weeks and set showHeader for events
        for (let i = 0; i < days.length; i += 7) {
            const week = days.slice(i, i + 7);
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