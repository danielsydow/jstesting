describe('Typeahead test suite', () => {
  describe('registerChange()', () => {
    beforeEach(() => {
      jasmine.getFixtures().load('typeahead.spec.html');
      jasmine.Ajax.install();
    });

    afterEach(() => {
      jasmine.Ajax.uninstall();
    });

    it('renders the response from the backend', () => {
      const responseText = [
        '123',
        'abc',
        '$%&'
      ];
      const httpResponse = {
        status: 200,
        contentType: 'text/json',
        responseText: JSON.stringify(responseText)
      };

      const typeahead = new Typeahead();

      typeahead.registerChange();
      const typeaheadElement = $('#typeahead');
      typeaheadElement.change();
      const request = jasmine.Ajax.requests.mostRecent();
      request.respondWith(httpResponse);

      expect($('#typeahead-suggestions')).toHaveText(responseText);
    });
  });
});