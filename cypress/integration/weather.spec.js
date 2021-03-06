/// <reference types="Cypress" />

beforeEach(() => {
	cy.visit('/het-weer/');
	cy.get('button.fjs-set-consent').first().click();
});

describe('The weather page', function() {
	it('Opening the weatherPage', function() {
		cy.get('.weather-title').should('be.visible');
		cy.get('.weather-map--national > figure > img').should('be.visible');
	});

	it('Searching a postalcode', function() {
		cy
			.get('.weather-searchbox>.form>>>.input--block')
			.should('be.visible')
			.type(Math.floor(Math.random() * 9999 + 1000));
		cy.get('.weather-searchbox >>>> .button').click();
		cy.get('.weather-section__body >>> .ajax-loader').should('be.visible');
	});

	it('Searching a community', function() {
		cy.get('.weather-searchbox>.form >>>.input--block').should('be.visible').type('Lembeek');
		cy.get('.weather-searchbox >>>> .button').click();
		cy.get('.weather-searchbox__results > :nth-child(1) > li > a').click();

		cy.get('.weather-title').should('be.visible').then(($weatherCity) => {
			expect($weatherCity.text()).to.contain('Lembeek');
		});
	});

	it('Searching a city', function() {
		let selectRanTable = Math.floor(Math.random() * 9 + 1);
		let selectRanRow = Math.floor(Math.random() * 5 + 1);
		let selectCity = ':nth-child(' + selectRanTable + ') > .table >> :nth-child(' + selectRanRow + ') >> a';
		//selecting a random city in the tabled list

		cy.get(selectCity).last().should('be.visible').then(($city) => {
			cy.get(selectCity).last().click();

			cy.get('.weather-title').should('be.visible').then(($weatherCity) => {
				expect($weatherCity.text()).to.contain($city.text());
			});

			cy.get('.weather-today__measuredTemp').should('be.visible');
		});
	});
});
