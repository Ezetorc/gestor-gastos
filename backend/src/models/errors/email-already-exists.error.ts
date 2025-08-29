import { CustomError } from "./custom-error.error";

export class EmailAlreadyExistsError extends CustomError {
    constructor(email: string){
        super(`El correo ${email} ya está registrado.`, 409);
    }
}