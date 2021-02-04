import { newE2EPage } from '@stencil/core/testing';

describe('eip-search-dialog', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<eip-search-dialog></eip-search-dialog>');
    const element = await page.find('eip-search-dialog');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<eip-search-dialog></eip-search-dialog>');
    const component = await page.find('eip-search-dialog');
    const element = await page.find('eip-search-dialog >>> div');
    expect(element.textContent).toEqual(`Hello, World! I'm `);

    component.setProperty('first', 'James');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James`);

    component.setProperty('last', 'Quincy');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Quincy`);

    component.setProperty('middle', 'Earl');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Earl Quincy`);
  });
});
