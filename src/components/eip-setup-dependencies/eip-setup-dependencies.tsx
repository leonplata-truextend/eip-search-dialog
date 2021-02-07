import { Component, h } from '@stencil/core';
import { container } from '../../singleton/di';

import { CallRecordingLocationUserAdvancedSearchService } from '../../services/advanced-search/call-recording-location-user-advanced-search-service';
import { OssmosisUserService } from '../../services/provisioning/ossmosis-user-service';
import { OssmosisCallRecordingSupervisorService } from '../../services/call-recording/ossmosis-call-recording-supervisor-service';

const providers = [
  OssmosisUserService,
  OssmosisCallRecordingSupervisorService,
  CallRecordingLocationUserAdvancedSearchService,
];

for (const provider of providers) {
  provider.bindToContainer(container);
}

@Component({
  tag: 'eip-setup-dependencies',
  shadow: true,
})
export class EipSetupDependencies {
  render() {
    return <div></div>
  }
}