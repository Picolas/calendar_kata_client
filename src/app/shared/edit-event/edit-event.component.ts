import {Component, Input, OnInit} from '@angular/core';
import {PartialEvent} from "../../interfaces/Event";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {EventService} from "../../services/EventService/event.service";

import {EventPopupService} from "../../services/EventPopupService/event-popup.service";
import {catchError} from "rxjs/operators";
import {EMPTY} from "rxjs";
import {RefreshDaysService} from "../../services/RefreshDaysService/refresh-days.service";

@Component({
	selector: 'app-edit-event',
	standalone: true,
	imports: [
    ReactiveFormsModule
],
	templateUrl: './edit-event.component.html',
	styleUrl: './edit-event.component.css'
})
export class EditEventComponent implements OnInit {
	@Input() event: PartialEvent | null = null;

	eventForm: FormGroup<{
		title: FormControl,
		description: FormControl,
		startDate: FormControl,
		endDate: FormControl,
		//inUser: FormArray
	}>;

	constructor(private fb: FormBuilder, private eventService: EventService, private eventPopupService: EventPopupService, private refreshDaysService: RefreshDaysService) {
		this.eventForm = this.fb.group({
			title: this.fb.control('', Validators.required),
			description: this.fb.control('', Validators.required),
			startDate: this.fb.control('', Validators.required),
			endDate: this.fb.control('', Validators.required),
			//inUser: this.fb.array([])
		});
	}

	ngOnInit() {
		if (this.event) {
			const startDate = new Date(this.event.startDate!);
			const endDate = new Date(this.event.endDate!);

			this.eventForm.patchValue({
				title: this.event.title,
				description: this.event.description,
				startDate: startDate.toISOString().substring(0, 16),
				endDate: endDate.toISOString().substring(0, 16)
			});
			//this.event.inUser!.forEach(user => this.inUser.push(this.fb.control(user.email)));
		}
	}

	/*
	get inUser() {
		return this.eventForm.get('inUser') as FormArray;
	}

	addParticipant() {
		this.inUser.push(this.fb.control(''));
	}

	removeParticipant(index: number) {
		this.inUser.removeAt(index);
	}
	 */

	onSubmit() {
		if (!this.event || this.eventForm.invalid) {
			return;
		}

		const startDate = new Date(this.eventForm.value.startDate);
		const endDate = new Date(this.eventForm.value.endDate);
		const updatedEvent: PartialEvent = {
			...this.event,
			title: this.eventForm.value.title,
			description: this.eventForm.value.description,
			startDate: new Date(this.eventForm.value.startDate),
			endDate: new Date(this.eventForm.value.endDate),
			//inUser: this.eventForm.value.inUser.map(name => ({name}))
		};

		this.eventService.updateEvent(updatedEvent).pipe(
			catchError(error => {
				console.error('Error submit edition', error);
				return EMPTY;
			})
		).subscribe(event => {
				this.event = null;
				this.eventPopupService.closeModal();
				this.refreshDaysService.refreshEvents(startDate, endDate);
			}
		);
	}
}
