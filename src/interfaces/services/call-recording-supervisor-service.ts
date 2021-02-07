export interface CallRecordingSupervisor {
  name: string;
}

export interface ICallRecordingSupervisorService {
  getSupervisors(): Promise<CallRecordingSupervisor[]>;
}

export const CALL_RECORDING_SUPERVISOR_SERVICE = Symbol('CALL_RECORDING_SUPERVISOR_SERVICE');
