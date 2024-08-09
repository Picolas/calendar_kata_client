import {CreateEventDto} from "../dtos/CreateEventDto";
import {UpdateEventDto} from "../dtos/UpdateEventDto";

export class EventMapper {
	static toCreateDto(formValue: any): CreateEventDto {
		return {
			title: formValue.title,
			description: formValue.description,
			startDate: new Date(formValue.startDate).toISOString(),
			endDate: new Date(formValue.endDate).toISOString(),
			inUser: formValue.inUser.filter((email: string | null) => email !== null) as string[]
		};
	}

	static toUpdateDto(formValue: any): UpdateEventDto {
		return {
			title: formValue.title,
			description: formValue.description,
			startDate: new Date(formValue.startDate).toISOString(),
			endDate: new Date(formValue.endDate).toISOString(),
			inUser: formValue.inUser
		};
	}
}
