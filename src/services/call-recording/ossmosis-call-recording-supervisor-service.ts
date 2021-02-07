import { injectable, Container } from 'inversify';
import { CALL_RECORDING_SUPERVISOR_SERVICE, ICallRecordingSupervisorService } from '../../interfaces/services/call-recording-supervisor-service';

@injectable()
export class OssmosisCallRecordingSupervisorService implements ICallRecordingSupervisorService {

  static bindToContainer(container: Container = new Container()) {
    container.bind<ICallRecordingSupervisorService>(CALL_RECORDING_SUPERVISOR_SERVICE).to(this);
  }

  async getSupervisors() {
    return [];
  }
}
