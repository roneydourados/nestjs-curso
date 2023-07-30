import { UserDTO } from 'src/modules/user/dtos/user.dto';
import { Token } from '../dtos/auth.token.dto';

export interface AuthRepositoryDTO {
  createToken?(user: UserDTO): string;
  checkToken(token: string): object;
  login(email: string, password: string): Promise<Token>;
  forget(email: string): Promise<void>;
  reset(password: string, token: string): Promise<Token>;
  register(user: UserDTO): Promise<Token>;
  me(token: string): Promise<object>;
  isValidToken?(token: string): boolean;
}
