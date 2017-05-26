import { D3ExperimentsPage } from './app.po';

describe('d3-experiments App', () => {
  let page: D3ExperimentsPage;

  beforeEach(() => {
    page = new D3ExperimentsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
