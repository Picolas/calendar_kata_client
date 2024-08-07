import {Component} from '@angular/core';
import {EventComponent} from "../../../shared/event/event.component";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {EventService} from "../../../services/EventService/event.service";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {HotToastService} from "@ngxpert/hot-toast";
import {ErrorComponent} from "../../../shared/error/error.component";
import {CreateEventDto} from "../../../dtos/CreateEventDto";

@Component({
	selector: 'app-create',
	standalone: true,
	imports: [
		EventComponent,
		ReactiveFormsModule,
		ErrorComponent
	],
	templateUrl: './create.component.html',
	styleUrl: './create.component.css'
})
export class CreateComponent {
	addEventForm: FormGroup<{
		title: FormControl<string | null>,
		description: FormControl<string | null>,
		startDate: FormControl<string | null>,
		endDate: FormControl<string | null>,
		inUser: FormArray<FormControl<string | null>>
	}>;

	error: string | null = null;

	constructor(private fb: FormBuilder, private eventService: EventService, private toast: HotToastService) {
		this.addEventForm = this.fb.group({
			title: this.fb.control('', Validators.required),
			description: this.fb.control('', Validators.required),
			startDate: this.fb.control('', Validators.required),
			endDate: this.fb.control('', Validators.required),
			inUser: this.fb.array<FormControl<string | null>>([])
		});
	}

	get inUser() {
		return this.addEventForm.get('inUser') as FormArray<FormControl<string | null>>;
	}

	addParticipant() {
		this.inUser.push(this.fb.control('', [Validators.required, Validators.email]));
	}

	removeParticipant(index: number) {
		this.inUser.removeAt(index);
	}

	onSubmit() {
		if (this.addEventForm.invalid) {
			return;
		}

		const event: CreateEventDto = {
			title: this.addEventForm.value.title!,
			description: this.addEventForm.value.description!,
			startDate: new Date(this.addEventForm.value.startDate!).toISOString(),
			endDate: new Date(this.addEventForm.value.endDate!).toISOString(),
			inUser: this.addEventForm.value.inUser!.filter(email => email !== null) as string[]
		};

		this.eventService.createEvent(event).pipe(
			catchError(error => {
				console.error('Error submitting event creation', error);
				this.error = error.error.message;
				return of(null);
			})
		).subscribe((response) => {
			if (response) {
				this.toast.success(`L'événement ${event.title} a bien été créé`);
				this.addEventForm.reset();
				this.inUser.clear();
			}
		});
	}
}
