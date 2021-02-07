import { newSpecPage } from '@stencil/core/testing';
import { EipAdvancedSearchDialog } from './eip-advanced-search-dialog';

describe('eip-search-dialog', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [EipAdvancedSearchDialog],
      html: '<eip-advanced-search-dialog></eip-advanced-search-dialog>',
    });
    expect(root).toEqualHtml(`
      <eip-advanced-search-dialog>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </eip-advanced-search-dialog>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [EipAdvancedSearchDialog],
      html: `<eip-advanced-search-dialog first="Stencil" last="'Don't call me a framework' JS"></eip-advanced-search-dialog>`,
    });
    expect(root).toEqualHtml(`
      <eip-advanced-search-dialog first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </eip-advanced-search-dialog>
    `);
  });
});
