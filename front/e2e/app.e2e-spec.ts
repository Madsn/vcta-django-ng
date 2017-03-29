import { FrontNg2Page } from './app.po';

describe('front-ng2 App', () => {
  let page: FrontNg2Page;

  beforeEach(() => {
    page = new FrontNg2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
