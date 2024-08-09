import {LoginDto} from "../dtos/LoginDto";
import {RegisterDto} from "../dtos/RegisterDto";

export class AuthMapper {
	static toLoginDto(formValue: any): LoginDto {
		return {
			email: formValue.email,
			password: formValue.password
		};
	}

	static toRegisterDto(formValue: any): RegisterDto {
		return {
			name: formValue.name,
			email: formValue.email,
			password: formValue.password
		};
	}
}
