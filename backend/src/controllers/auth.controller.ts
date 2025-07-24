import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface RegisterBody {
    name: string;
    email: string;
    password: string;
}

export const registerUser = async (
    req: Request<{}, {}, RegisterBody>,
    res: Response
): Promise<void> => {

    try {
    const { name, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'Correo inválido.' });
        return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        res.status(400).json({
            message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.',
        });
        return;
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        res.status(409).json({ message: 'El correo ya está registrado.' });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            image: "",
        },
    });

    res.status(201).json({ message: 'Usuario creado.', userId: user.id });
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};