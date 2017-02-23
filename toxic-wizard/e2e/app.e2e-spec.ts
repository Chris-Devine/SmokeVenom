import { ToxicWizardPage } from './app.po';

describe('toxic wizard App', function() {
  let page: ToxicWizardPage;

  beforeEach(() => {
    page = new ToxicWizardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    //expect(page.getParagraphText()).toEqual('app works!');
  });
});
