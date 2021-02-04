import { newSpecPage } from '@stencil/core/testing';
import { EipSearchDialog } from './eip-search-dialog';

describe('eip-search-dialog', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [EipSearchDialog],
      html: '<eip-search-dialog></eip-search-dialog>',
    });
    expect(root).toEqualHtml(`
      <eip-search-dialog>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </eip-search-dialog>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [EipSearchDialog],
      html: `<eip-search-dialog first="Stencil" last="'Don't call me a framework' JS"></eip-search-dialog>`,
    });
    expect(root).toEqualHtml(`
      <eip-search-dialog first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </eip-search-dialog>
    `);
  });
});
