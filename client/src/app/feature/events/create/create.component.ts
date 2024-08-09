import {Component} from '@angular/core';
import {EventComponent} from "../../../shared/event/event.component";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HotToastService} from "@ngxpert/hot-toast";
import {ErrorComponent} from "../../../shared/error/error.component";
import {InputComponent} from "../../../shared/input/input.component";
import {FormComponent} from "../../../shared/form/form.component";
import {ButtonComponent} from "../../../shared/button/button.component";
import {EventMapper} from "../../../mappers/EventMapper";
import {EventFormService} from "../../../services/EventFormService/event-form.service";
import {dateOrderValidator} from "../../../validators/date-order.validator";

@Component({
	selector: 'app-create',
	standalone: true,
	imports: [
		EventComponent,
		ReactiveFormsModule,
		ErrorComponent,
		InputComponent,
		FormComponent,
		ButtonComponent
	],
	templateUrl: './create.component.html',
	styleUrl: './create.component.css'
})
export class CreateComponent {
	addEventForm: FormGroup;

	error: string | null = null;

	constructor(private fb: FormBuilder, private toast: HotToastService, private eventFormService: EventFormService) {
		this.addEventForm = this.fb.group({
			title: this.fb.control('', Validators.required),
			description: this.fb.control('', Validators.required),
			startDate: this.fb.control('', Validators.required),
			endDate: this.fb.control('', Validators.required),
			inUser: this.fb.array<FormControl<string | null>>([])
		}, {validators: dateOrderValidator()});
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

		const createEventDto = EventMapper.toCreateDto(this.addEventForm.value);
		this.eventFormService.createEvent(createEventDto).subscribe({
			next: () => {
				this.addEventForm.reset();
				this.inUser.clear();
			},
			error: (error) => {
				this.error = error.message;
			}
		});
	}
}
