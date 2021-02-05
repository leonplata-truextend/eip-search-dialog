import { User } from './entities/user';


export interface IUserService {
  getUsers(): Promise<User[]>;
}

export const USER_SERVICE_PROVIDER = Symbol('USER_SERVICE_PROVIDER');
