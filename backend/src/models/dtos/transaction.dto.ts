import { TransactionType } from "@prisma/client";
import { Type } from "class-transformer";
import "reflect-metadata";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class TransactionDto {
    @IsNotEmpty()
    @IsNumber()
    amount: number;
    
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date) // transforma el string recibido en un objeto Date
    date: Date;

    @IsNotEmpty() 
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    category: string;

    @IsNotEmpty()
    @IsString()
    paymentMethod: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsEnum(TransactionType)
    type: TransactionType;


}