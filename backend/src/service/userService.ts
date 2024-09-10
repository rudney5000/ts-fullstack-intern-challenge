import { Repository } from "typeorm";
import * as crypto from "crypto";

import dataSource from "../data-source";
import User from "../entity/User";
import UserDto from "../../../api/src/dto/user.dto";

export default class UserService {
  private repository: Repository<User>;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  private generateSalt(length: number): string {
    return crypto.randomBytes(length).toString("hex");
  }

  private generateAuthToken(login: string, salt: string): string {
    return crypto.createHash("sha256").update(`${login}${salt}`).digest("hex");
  }

  public async compareTokens(id: number, token: string): Promise<boolean> {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) return false;

    const userToken = this.generateAuthToken(user.login, user.salt);
    return userToken === token;
  }

  public async getUser(id: number): Promise<User> {
    const userExists = await this.repository.findOne({ where: { id } });

    if (!userExists) {
      throw new Error("Пользователя не существует");
    }
    return userExists;
  }

  public async postUser(user: UserDto): Promise<{ user: User; token: string }> {
    const { login, password } = user;
    const userExists = await this.repository.findOne({ where: { login } });

    if (!userExists) {
      const salt = this.generateSalt(16);
      const token = this.generateAuthToken(login, salt);
      const userWithSalt = this.repository.create({ ...user, salt: salt });
      const newUser = await this.repository.save(userWithSalt);
      return { user: newUser, token: token };
    }

    const isEqualPassword = userExists.password === password;
    if (isEqualPassword) {
      const token = this.generateAuthToken(userExists.login, userExists.salt);
      return { user: userExists, token: token };
    } else {
      throw new Error("Неправильный пароль");
    }
  }
}
