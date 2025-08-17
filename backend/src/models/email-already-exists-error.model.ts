export class EmailAlreadyExistsError extends Error {
    constructor(email: string){
        super(`El correo ${email} ya está registrado.`);
        this.name = `EmailAlreadyExistsError`;
    }
}