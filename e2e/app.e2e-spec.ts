import { StreamGaugePage } from './app.po';

describe('stream-gauge App', () => {
  let page: StreamGaugePage;

  beforeEach(() => {
    page = new StreamGaugePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
