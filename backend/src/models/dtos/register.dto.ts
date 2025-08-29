import {IsEmail, IsNotEmpty, MinLength, Matches} from 'class-validator';

export class RegisterDto{
    @IsNotEmpty({message: 'El nombre es obligatorio'})
    public name!: string;

    @IsEmail({}, {message: 'El formato de correo no es válido.'})
    public email!: string;

    @MinLength(8, {message: 'La contraseña debe tener al menos 8 caracteres.'})
    @Matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, {
        message: 'La contraseña debe tener al menos una mayúscula y un número.'
    })
    public password!: string;
    
    public image!: string;
}