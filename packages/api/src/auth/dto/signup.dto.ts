import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class SignupDto {
  @IsString()
  @MinLength(3)
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string
}
