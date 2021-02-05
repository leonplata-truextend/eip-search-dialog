import { injectable } from 'inversify';
import { IUserService } from '../interfaces/user-service';

@injectable()
export class OssmosisUserService implements IUserService {

  async getUsers() {
    return [
      { name: 'user1' },
      { name: 'user2' },
      { name: 'user3' },
      { name: 'user4' },
      { name: 'user5' },
      { name: 'user6' },
      { name: 'user7' },
      { name: 'user8' },
      { name: 'user9' },
    ];
  }
}