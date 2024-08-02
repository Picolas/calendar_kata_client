import {Pipe, PipeTransform} from '@angular/core';
import {RandomColor} from "../../utils/RandomColor";

@Pipe({
	name: 'randomColor',
	standalone: true
})
export class RandomColorPipe implements PipeTransform {

	transform(value: unknown, ...args: unknown[]): string {
		return RandomColor.getRandomColor();
	}

}
