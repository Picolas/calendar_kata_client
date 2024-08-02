import {COLORS} from "../constants/colors";

export class RandomColor {
	static getRandomColor(): string {
		const colors = COLORS;
		const randomIndex = Math.floor(Math.random() * colors.length);
		return colors[randomIndex];
	}
}
