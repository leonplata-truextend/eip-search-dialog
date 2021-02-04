import { injectable } from 'inversify';
import { IUserService } from '../interfaces/user-service';

@injectable()
export class OssmosisUserService implements IUserService {

  async getUsers() {
    return [];
  }
}