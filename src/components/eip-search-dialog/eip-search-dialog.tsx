import { Component, State, Method, h } from '@stencil/core';
import { lazyInject } from '../../singleton/di';
import { store, Unsubscribe, StateMapper, DispatchMapper } from '../../singleton/store';
import { USER_SEARCH_THUNK_PROVIDER, IUserSearchThunk } from '../../interfaces/user-search-thunk';
import '@material/mwc-dialog';
import '@material/mwc-textfield';
import '@material/mwc-button';
import '@material/mwc-checkbox';
import '@material/mwc-list';
import '@material/mwc-icon';

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

@Component({
  tag: 'eip-search-dialog',
  styleUrl: 'eip-search-dialog.css',
  shadow: true,
})
export class EipSearchDialog {

  @lazyInject(USER_SEARCH_THUNK_PROVIDER)
  userSearchThunk: IUserSearchThunk;

  @State()
  loading: number;

  @State()
  text: string = '';

  unsubscribe!: Unsubscribe;

  retrieveInitialData!: IUserSearchThunk['retrieveInitialData'];

  connectedCallback() {
    this.unsubscribe = store.mapStateToProps(this, stateMapper);
    store.mapDispatchToProps(this, dipatchMapper);
  }

  disconnectedCallback() {
    this.unsubscribe();
  }

  @Method()
  async open() {
    this.retrieveInitialData();
  }

  private handleInput(event) {
    this.text = event.target.value;
  }

  render() {
    return (
    <div>
      <mwc-list>
        {[1, 2, 3, 4].map(item =>
          <mwc-list-item twoline>
            <span>Item {item}</span>
            <span slot="secondary">
              <mwc-icon class="small-icon">shopping_cart</mwc-icon>
              Secondary line
            </span>
          </mwc-list-item>
        )}
      </mwc-list>
      <mwc-textfield
        label={'hello'}
        value={this.text}
        onInput={(event) => this.handleInput(event)}
      >
      </mwc-textfield>
      <mwc-button
        raised
        onClick={() => alert(this.text)}
      >
        Continue
      </mwc-button>
      <mwc-checkbox
        checked={this.loading}
      >
      </mwc-checkbox>
      {this.loading}
    </div>
    );
  }
}
