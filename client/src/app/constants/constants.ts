import {Time} from "../interfaces/Time";

export const CALENDAR_START_TIME: Time = {hour: 0, minutes: 0};
export const CALENDAR_END_TIME: Time = {hour: 24, minutes: 0};

export const MIN_CALENDAR_HEIGHT = 700;

export const MAX_EVENT_UNTIL_REDUCE = 4;

export const API_URL = 'http://localhost:3000';

export const API_PATH = '/api';

export const WEEK_DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

export const WEB_SOCKET_URL = 'ws://localhost:8080';
