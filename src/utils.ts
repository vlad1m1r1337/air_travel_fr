import {ru} from "date-fns/locale";
import {format} from "date-fns";

export function formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} ч ${remainingMinutes} мин`;
}

export function formatDate(date: string): string[] {
    const Date = format(date, 'HH:mm dd MMM EEEE', { locale: ru });
    return Date.split(' ');
}
