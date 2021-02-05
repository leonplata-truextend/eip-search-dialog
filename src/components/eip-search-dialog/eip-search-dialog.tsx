import { Component, State, Method, h } from '@stencil/core';
import { boundMethod } from 'autobind-decorator';
import { lazyInject } from '../../singleton/di';
import { setLanguage } from '../../singleton/language';
import { store, Unsubscribe, StateMapper, DispatchMapper } from '../../singleton/store';
import { Localize, localizeFallback } from '../../interfaces/intl';

import { User } from '../../interfaces/entities/user';
import { USER_SEARCH_THUNK_PROVIDER, IUserSearchThunk } from '../../interfaces/user-search-thunk';
import { USER_SERVICE_PROVIDER, IUserService } from '../../interfaces/user-service';

import locales from './locales.json';
import { TextField } from '@material/mwc-textfield';
import '@material/mwc-dialog';
import '@material/mwc-button';
import '@material/mwc-checkbox';
import '@material/mwc-list';
import '@material/mwc-icon';

//------------------------------------------------------------------------------

//#region Redux Mappers

const stateMapper: StateMapper<EipSearchDialog> = ({
  searchResults: {
    loading,
  },
}) => ({
  loading,
});

const dipatchMapper: DispatchMapper<IUserSearchThunk, EipSearchDialog> = ({
  retrieveInitialData,
}) => ({
  retrieveInitialData,
});

//#endregion

//------------------------------------------------------------------------------

@Component({
  tag: 'eip-search-dialog',
  styleUrls: [
    '../default-theme.css',
    'eip-search-dialog.css',
  ],
  shadow: true,
})
export class EipSearchDialog {

  //----------------------------------------------------------------------------

  //#region Injected Services

  @lazyInject(USER_SEARCH_THUNK_PROVIDER)
  protected userSearchThunk: IUserSearchThunk;

  @lazyInject(USER_SERVICE_PROVIDER)
  protected userService: IUserService;

  //#endregion

  //----------------------------------------------------------------------------

  //#region Component State

  @State()
  localize: Localize = localizeFallback;

  @State()
  loading: number;

  @State()
  text: string = '';

  @State()
  users: User[] = [];

  //#endregion

  //----------------------------------------------------------------------------

  //#region Attached Method Declarations

  unsubscribe!: Unsubscribe;

  retrieveInitialData!: IUserSearchThunk['retrieveInitialData'];

  //#endregion

  //----------------------------------------------------------------------------

  //#region LifeCycle Hooks

  connectedCallback() {
    this.unsubscribe = store.mapStateToProps(this, stateMapper);
    store.mapDispatchToProps(this, dipatchMapper);
    this.userService.getUsers()
      .then(users => this.users = users);
  }

  disconnectedCallback() {
    this.unsubscribe();
  }

  //#endregion

  //----------------------------------------------------------------------------

  //#region Exposed Methods

  @Method()
  async open() {
    this.retrieveInitialData();
  }

  //#endregion

  //----------------------------------------------------------------------------

  //#region Event Listeners

  @boundMethod
  listenLocalize(event: CustomEvent<Localize>) {
    this.localize = event.detail;
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
      localize,
      text,
      loading,
      listenLocalize,
      listenTextInput,
      listenAlertButtonClick,
    } = this;

    return (
    <div>
      <eip-intl
        onLocalize={listenLocalize}
        resources={locales}
      />
      <mwc-dialog open>
        <mwc-list>
          {this.users.map(user => (
            <mwc-list-item twoline>
              <span>{localize('item')} {user.name}</span>
              <span slot="secondary">
                <mwc-icon class="small-icon">tag_faces</mwc-icon>
                {localize('secondary')}
              </span>
            </mwc-list-item>
          ))}
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
