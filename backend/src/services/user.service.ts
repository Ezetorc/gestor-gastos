import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import { RegisterUserDto } from '../dto/register-user.dto';
import { User } from '@prisma/client';

export class UserService{

    async register(data: RegisterUserDto): Promise<User>{
        const existingUser = await UserRepository.getByEmail(data.email);
        if(existingUser){
            throw new Error('El correo ya está registrado.');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = await UserRepository.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            image: data.image
        });

        return newUser;
    }
}