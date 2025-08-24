import { IsEmail, IsNotEmpty, MinLength, Matches } from "class-validator";

export class RegisterDto {
  @IsNotEmpty({ message: "Name is missing" })
  public name!: string;

  @IsEmail({}, { message: "Invalid emai" })
  public email!: string;

  @MinLength(8, { message: "The password must be at least 8 characters long" })
  @Matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message:
      "The password must contain at least one uppercase letter and one number",
  })
  public password!: string;

  public image!: string;
}
