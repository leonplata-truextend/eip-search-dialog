import { Component, State, Method, h } from '@stencil/core';
import { boundMethod } from 'autobind-decorator';

import { lazyInject } from '../../singleton/di';
import { setLanguage } from '../../singleton/language';
import { Unsubscribe, StateMapper } from '../../singleton/store';

import { SearchItemState } from '../../interfaces/state/search-result-state';
import { Localize, localizeFallback } from '../../interfaces/intl';
import { AdvancedSearchService } from '../../interfaces/services/common/advanced-search-service';

import locales from './locales.json';

import { TextField } from '@material/mwc-textfield';
import '@material/mwc-dialog';
import '@material/mwc-button';
import '@material/mwc-checkbox';
import '@material/mwc-list';
import '@material/mwc-icon';

//------------------------------------------------------------------------------

//#region Redux Mappers

const stateMapper: StateMapper<EipAdvancedSearchDialog> = ({
  searchResults: {
    loading,
    results,
  },
}) => ({
  loading,
  results,
});

//#endregion

//------------------------------------------------------------------------------

@Component({
  tag: 'eip-advanced-search-dialog',
  styleUrls: [
    '../default-theme.css',
    'eip-advanced-search-dialog.css',
  ],
  shadow: true,
})
export class EipAdvancedSearchDialog {

  //----------------------------------------------------------------------------

  //#region Injected Services

  @lazyInject(LOCALIZE_SERVICE_PROVIDER)
  private readonly localizeService: LocalizeService;

  @lazyInject(STORE_SERVICE_PROVIDER)
  private readonly storeService: StoreService,

  /** Parent element will inject */
  private readonly advancedSearchService: AdvancedSearchService;

  //#endregion

  //----------------------------------------------------------------------------

  //#region Component State

  @State()
  localize: Localize = localizeFallback;

  @State()
  loading: number = 0;

  @State()
  text: string = '';

  @State()
  results: SearchItemState[] = [];

  subscriptions: Unsubscribe[];

  //#endregion

  //----------------------------------------------------------------------------

  //#region LifeCycle Hooks

  connectedCallback() {
    this.subscriptions.push(
      this.storeService.mapStateToProps(this, stateMapper),
      this.localizeService.subscribe(this.listenLocalize),
    );
  }

  disconnectedCallback() {
    this.subscriptions.forEach(unsubscribe => unsubscribe());
  }

  //#endregion

  //----------------------------------------------------------------------------

  //#region Exposed Methods

  @Method()
  async open() {
    this.advancedSearchService.retrieveInitialData();
  }

  //#endregion

  //----------------------------------------------------------------------------

  //#region Event Listeners

  @boundMethod
  listenLocalize({ buildLocalize }) {
    this.localize = buildLocalize(locales);
  }

  @boundMethod
  listenTextInput(event: Event) {
    this.text = (event.target as TextField).value;
  }

  @boundMethod
  listenAlertButtonClick() {
    alert(this.text);
  }

  //#endregion

  //----------------------------------------------------------------------------

  //#region Template

  render() {
    const {
      text,
      results,
      loading,
      localize,
      listenTextInput,
      listenAlertButtonClick,
    } = this;

    const renderItem = (item: SearchItemState) => (
      <mwc-list-item twoline>
        <span>{localize('item')} {item.content}</span>
        <span slot="secondary">
          <mwc-icon class="small-icon">tag_faces</mwc-icon>
          {localize('secondary')}
        </span>
      </mwc-list-item>
    ); 

    return (
    <div>
      <mwc-dialog open>
        <mwc-list>
          {results.map(renderItem)}
        </mwc-list>
        <mwc-textfield
          label={localize('hello')}
          value={text}
          onInput={listenTextInput}
        >
        </mwc-textfield>
        <mwc-button
          raised
          onClick={listenAlertButtonClick}
        >
          {localize('continue')}
        </mwc-button>
        <mwc-checkbox
          checked={loading}
        />
        <div>
          <h1>Language</h1>
          <mwc-button
            raised
            onClick={() => setLanguage('en')}
          >
            English
          </mwc-button>
          <mwc-button
            raised
            onClick={() => setLanguage('es')}
          >
            Spanish
          </mwc-button>
        </div>
      </mwc-dialog>
    </div>
    );
  }

  //#endregion

  //----------------------------------------------------------------------------
}
