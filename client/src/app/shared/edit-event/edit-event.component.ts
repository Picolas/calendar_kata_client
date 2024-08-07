import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PartialEvent} from '../../interfaces/Event';
import {UpdateEventDto} from '../../dtos/UpdateEventDto';

@Component({
	selector: 'app-edit-event',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './edit-event.component.html',
	styleUrl: './edit-event.component.css'
})
export class EditEventComponent implements OnInit {
	@Input() event: PartialEvent | null = null;
	@Output() onSubmit = new EventEmitter<UpdateEventDto>();

	eventForm: FormGroup;

	constructor(private fb: FormBuilder) {
		this.eventForm = this.fb.group({
			title: ['', Validators.required],
			description: ['', Validators.required],
			startDate: ['', Validators.required],
			endDate: ['', Validators.required],
			inUser: this.fb.array([])
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

			this.event.inUser?.forEach(user => this.inUser.push(this.fb.control(user.email)));
		}
	}

	get inUser() {
		return this.eventForm.get('inUser') as FormArray;
	}

	addParticipant() {
		this.inUser.push(this.fb.control('', [Validators.required, Validators.email]));
	}

	removeParticipant(index: number) {
		this.inUser.removeAt(index);
	}

	onSubmitForm() {
		if (this.eventForm.invalid) {
			return;
		}

		const updatedEvent: UpdateEventDto = {
			title: this.eventForm.value.title,
			description: this.eventForm.value.description,
			startDate: new Date(this.eventForm.value.startDate).toISOString(),
			endDate: new Date(this.eventForm.value.endDate).toISOString(),
			inUser: this.eventForm.value.inUser
		};

		this.onSubmit.emit(updatedEvent);
	}
}
