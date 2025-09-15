import { TransactionType } from "@prisma/client";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateTransactionDto {

    //Solo se pueden modificar los siguientes campos: fecha, categoría, cantidad, descripción y tipo.
    @IsOptional()
    @IsNumber()
    amount: number;
  
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    date: Date;
  
     
     @IsOptional()
    @IsString()
    category: string;   
  
     @IsOptional()
    @IsString()
    description: string;
  
     @IsOptional()
    @IsEnum(TransactionType)
    type: TransactionType;
}