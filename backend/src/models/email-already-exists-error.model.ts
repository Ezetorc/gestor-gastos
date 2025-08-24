import { CustomError } from "./custom-error.model";

export class EmailAlreadyExistsError extends CustomError {
    constructor(email: string){
        super(`Email ${email} is already registered`, 409);
    }
}