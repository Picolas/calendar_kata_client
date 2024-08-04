import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PopupEventComponent} from './popup-event.component';

describe('EventComponent', () => {
	let component: PopupEventComponent;
	let fixture: ComponentFixture<PopupEventComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PopupEventComponent]
		})
			.compileComponents();

		fixture = TestBed.createComponent(PopupEventComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
