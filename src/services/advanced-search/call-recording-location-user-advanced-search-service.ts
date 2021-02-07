import { injectable, inject } from 'inversify';
import { AdvancedSearchService } from '../../interfaces/services/common/advanced-search-service';
import { isLoading, hasLoaded, hasError, loadResults } from '../../state/slices/search-result';
import { APP_STORE_PROVIDER, AppStore } from '../../interfaces/state';
import { USER_SERVICE_PROVIDER, IUserService } from '../../interfaces/services/user-service';
import { CALL_RECORDING_SUPERVISOR_SERVICE, ICallRecordingSupervisorService } from '../../interfaces/services/call-recording-supervisor-service';

@injectable()
export class CallRecordingLocationUserAdvancedSearchService implements AdvancedSearchService {

  constructor(

    @inject(APP_STORE_PROVIDER)
    private readonly appStore: AppStore,

    @inject(USER_SERVICE_PROVIDER)
    private readonly userService: IUserService,

    @inject(CALL_RECORDING_SUPERVISOR_SERVICE) 
    private readonly supervisorService: ICallRecordingSupervisorService,

  ) {}

  async retrieveInitialData() {
    const { dispatch } = this.appStore;
    dispatch(isLoading());
    try {
      const users = await this.userService.getUsers();
      dispatch(hasLoaded());
      dispatch(loadResults({ results: users }));
    } catch (error) {
      dispatch(hasError(error));
    }
  }

  async getResultsByCriteria() {
    const { dispatch } = this.appStore;
    dispatch(isLoading());
    try {
      const supervisors = await this.supervisorService.getSupervisors();
      dispatch(hasLoaded());
      dispatch(loadResults({ results: supervisors }));
    } catch (error) {
      dispatch(hasError(error));
    }
  }
}
