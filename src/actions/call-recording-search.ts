import { isLoading, hasLoaded, hasError, loadResults } from '../state/search-results';
import { boundMethod } from 'autobind-decorator'
import { injectable, inject } from 'inversify';
import { IUserSearchThunk } from '../interfaces/user-search-thunk';
import { USER_SERVICE_PROVIDER, IUserService } from '../interfaces/user-service';
import { CALL_RECORDING_SUPERVISOR_SERVICE, ICallRecordingSupervisorService } from '../interfaces/call-recording-supervisor-service';

@injectable()
export class CallRecordingSearchThunk implements IUserSearchThunk {

  constructor(

    @inject(USER_SERVICE_PROVIDER)
    private userService: IUserService,

    @inject(CALL_RECORDING_SUPERVISOR_SERVICE)
    private supervisorService: ICallRecordingSupervisorService,

  ) {}

  @boundMethod
  retrieveInitialData() {
    return async(dispatch) => {
      dispatch(isLoading());
      try {
        const users = await this.userService.getUsers();
        dispatch(hasLoaded());
        dispatch(loadResults({ results: users }));
      } catch (error) {
        dispatch(hasError(error));
      }
    };
  }

  @boundMethod
  getResultsByCriteria() {
    return async(dispatch) => {
      dispatch(isLoading());
      try {
        const supervisors = await this.supervisorService.getSupervisors();
        dispatch(hasLoaded());
        dispatch(loadResults({ results: supervisors }));
      } catch (error) {
        dispatch(hasError(error));
      }
    };
  }
}
