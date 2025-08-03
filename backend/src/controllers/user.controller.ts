import {Request, Response} from 'express';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/user.repository';

const userService = new UserService(new UserRepository());

export class UserController {
    async registerUser(req: Request, res: Response): Promise<void>{
        try{
            const newUser = await userService.register(req.body);
            res.status(201).json({message: 'Usuario creado.', userId: newUser.id});
        }catch (error){
            if(error instanceof Error && error.message.includes('ya está registrado')){
                res.status(409).json({message: error.message});
            }else{
                res.status(500).json({message: 'Error interno del servidor'})
            }
        }
    }
}