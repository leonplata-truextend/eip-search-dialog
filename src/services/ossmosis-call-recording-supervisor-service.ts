import { injectable } from 'inversify';
import { ICallRecordingSupervisorService } from '../interfaces/call-recording-supervisor-service';

@injectable()
export class OssmosisCallRecordingSupervisorService implements ICallRecordingSupervisorService {

  async getSupervisors() {
    return [];
  }
}
