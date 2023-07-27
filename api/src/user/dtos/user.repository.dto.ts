import { PrismaService } from 'src/prisma/prisma.service';
import { UserCreateDTO } from './user.create.dto';

export class UserRepsitoryDTO extends PrismaService {
  show: (id: number) => UserCreateDTO;
}
