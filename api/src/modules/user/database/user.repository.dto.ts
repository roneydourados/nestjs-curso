import { Role } from 'src/enums/role.enum';
import { UserDTO } from '../dtos/user.dto';

export interface UserRepositoryDTO {
  list(): Promise<UserDTO[]>;
  show(id: number): Promise<UserDTO>;
  create(data: UserDTO, role?: Role): Promise<UserDTO>;
  update(id: number, data: UserDTO, role?: Role): Promise<UserDTO>;
  delete(id: number): Promise<void>;
  exists(id: number): Promise<UserDTO>;
}
