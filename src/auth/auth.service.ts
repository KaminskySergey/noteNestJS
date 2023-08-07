import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, AuthDocument } from './user.model';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import { compare, genSalt, hash } from 'bcryptjs';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constans';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly authModel: Model<AuthDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async create(dto: AuthDto) {
    const salt = await genSalt(10);
    const newUser = new this.authModel({
      email: dto.email,
      hashPassword: await hash(dto.password, salt),
    });
    return newUser.save();
    // const createUser = await this.authModel.create(dto);
    // return createUser;
  }

  async findUser(email: string) {
    const foundUser = await this.authModel.findOne({ email }).exec();
    return foundUser;
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<User, 'email'>> {
    console.log(email, 'email');
    console.log(password, 'pass');
    console.log('11111111111111', '11111');
    const user = await this.findUser(email);
    console.log(user, 'userrrrr');
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }
    const isCorrectPassword = await compare(password, user.hashPassword);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }
    return { email: user.email };
  }

  async login(email: string) {
    console.log(email, 'email');
    const payload = { email };
    console.log(payload, 'payload');

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
