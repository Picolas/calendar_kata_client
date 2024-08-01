import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./layout/header/header.component";
import {NgIf} from "@angular/common";

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, HeaderComponent, NgIf],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {

	constructor(private router: Router) {
	}

	isAuthRoute(): boolean {
		return this.router.url === '/login' || this.router.url === '/register';
	}
}
