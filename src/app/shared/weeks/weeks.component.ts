import {Component} from '@angular/core';
import {WEEK_DAYS} from "../../constants/constants";

@Component({
	selector: 'app-weeks',
	standalone: true,
	imports: [],
	templateUrl: './weeks.component.html',
	styleUrl: './weeks.component.css'
})
export class WeeksComponent {
	weeks: string[] = WEEK_DAYS;

}
