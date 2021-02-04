import { Component, h } from '@stencil/core';
import { container } from '../../singleton/di';

import { USER_SEARCH_THUNK_PROVIDER, IUserSearchThunk } from '../../interfaces/user-search-thunk';
import { CallRecordingSearchThunk } from '../../actions/call-recording-search';

import { USER_SERVICE_PROVIDER, IUserService } from '../../interfaces/user-service';
import { OssmosisUserService } from '../../services/ossmosis-user-service';

import { CALL_RECORDING_SUPERVISOR_SERVICE, ICallRecordingSupervisorService } from '../../interfaces/call-recording-supervisor-service';
import { OssmosisCallRecordingSupervisorService } from '../../services/ossmosis-call-recording-supervisor-service';

container
  .bind<IUserSearchThunk>(USER_SEARCH_THUNK_PROVIDER)
  .to(CallRecordingSearchThunk);

container
  .bind<IUserService>(USER_SERVICE_PROVIDER)
  .to(OssmosisUserService);

container
  .bind<ICallRecordingSupervisorService>(CALL_RECORDING_SUPERVISOR_SERVICE)
  .to(OssmosisCallRecordingSupervisorService);

@Component({
  tag: 'eip-setup-dependencies',
  shadow: true,
})
export class EipSetupDependencies {
  render() {
    return <div></div>
  }
}