import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignupLocalDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 50)
  password: string;
}
