import { IsEmail, IsNumber, IsString, IsStrongPassword } from 'class-validator';

export class UserDTO {
  @IsNumber()
  id?: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string;
}
