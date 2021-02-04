import { Component, State, Method, h } from '@stencil/core';
import { store, Unsubscribe } from '@stencil/redux';
import initialStore from '../../state/store';
import { lazyInject } from '../../singleton/di';
import { USER_SEARCH_THUNK, IUserSearchThunk } from '../../interfaces/user-search-thunk';
import '@material/mwc-dialog';
import '@material/mwc-textfield';
import '@material/mwc-button';
import '@material/mwc-checkbox';
import '@material/mwc-list';
import '@material/mwc-icon';

store.setStore(initialStore);

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class EipUSerSearchDialog {

  @lazyInject(USER_SEARCH_THUNK)
  userSearchThunk: IUserSearchThunk;

  @State()
  loading: number;

  @State()
  text: string = '';

  unsubscribe!: Unsubscribe;

  retrieveInitialData!: IUserSearchThunk['retrieveInitialData'];

  connectedCallback() {
    this.unsubscribe = store.mapStateToProps(this, state => {
      const { searchResults: { loading } } = state;
      return { loading };
    });
    store.mapDispatchToProps(this, {
      retrieveInitialData: this.userSearchThunk.retrieveInitialData,
    });
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
