import { UserDTO } from '../../dtos/user.dto';

export interface UserRepositoryDTO {
  list(): Promise<UserDTO[]>;
  show(id: number): Promise<UserDTO>;
  create(data: UserDTO): Promise<UserDTO>;
  update(id: number, data: UserDTO): Promise<UserDTO>;
  delete(id: number): Promise<void>;
  exists(id: number): Promise<UserDTO>;
}
