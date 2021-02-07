import { injectable, Container } from 'inversify';
import { USER_SERVICE_PROVIDER, IUserService } from '../../interfaces/services/user-service';

@injectable()
export class OssmosisUserService implements IUserService {

  static bindToContainer(container: Container) {
    container.bind<IUserService>(USER_SERVICE_PROVIDER).to(this);
  }

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