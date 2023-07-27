import { UserDTO } from 'src/user/dtos/user.dto';
import { Token } from '../dtos/auth.token.dto';

export interface AuthRepositoryDTO {
  createToken?(user: UserDTO): Promise<string>;
  checkToken(token: string): Promise<object>;
  login(email: string, password: string): Promise<Token>;
  forget(email: string): Promise<void>;
  reset(password: string): Promise<Token>;
  register(user: UserDTO): Promise<Token>;
  me(token: string): Promise<object>;
}
