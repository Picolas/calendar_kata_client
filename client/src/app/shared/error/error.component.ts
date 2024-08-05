import {Component, Input} from '@angular/core';
import {ErrorStateService} from "../../services/ErrorStateService/error-state.service";

@Component({
	selector: 'app-error',
	standalone: true,
	imports: [],
	templateUrl: './error.component.html',
	styleUrl: './error.component.css'
})
export class ErrorComponent {
	@Input() error: any = null;

	constructor(private errorStateService: ErrorStateService) {
	}

	onClickCloseError() {
		this.errorStateService.setError(null);
		this.error = null;
	}
}
