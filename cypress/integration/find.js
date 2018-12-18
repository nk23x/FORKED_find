describe('Find', function() {
	beforeEach(() => {
		// Note, the server is started as part of the "test" script in package.json.
		cy.visit('http://localhost:3030')
	})

	it('is available as "Find" in the global window object', () => {
		cy.window().should('have.property', 'Find')
	})

	it('decodes search queries as expected', () => {
		cy.window().then(win => {
			function assertQuery(query, expected) {
				assert.equal(win.Find.decodeUserRequest(query), expected, query)
			}

			assertQuery('!m brazil', 'https://www.google.com/maps/search/brazil')
			assertQuery('!g brazil', 'https://encrypted.google.com/search?q=brazil')
			assertQuery('!r4 my radio', 'https://radio4000.com/search?search=my radio')
			assertQuery('+r4 https://www.youtube.com/watch?v=sZZlQqG7hEg', 'https://radio4000.com/add?url=https://www.youtube.com/watch?v=sZZlQqG7hEg')
		})
	})

	it('shows a form with input and button', () => {
		cy.get('form input')
			.type('!discogs hallogalli')
			.should('have.value', '!discogs hallogalli')
		// Can't test this because it redirects to an external domain,
		// which is blocked by iframe cross-origin stuff.
		// cy.get('form button').click()
	})

	it('decodes placholders in url', () => {
		cy.window().then(win => {
			function assertQuery(query, expected) {
				assert.equal(win.Find.decodeUserRequest(query), expected, query)
			}
			assertQuery('&gh internet4000/radio4000', 'https://github.com/internet4000/radio4000')
			assertQuery('&gh internet4000/radio4000', 'https://github.com/internet4000/radio4000')
		})
	})
})
