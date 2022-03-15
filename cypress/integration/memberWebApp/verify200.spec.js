const url = `${Cypress.env("MEMBER_BASE_URL")}/user/tim.hatcher+hi1@packhealth.com/verify`;
describe('API - Verify', () => {
	it('Verify 200 Response', () => {
		cy.request({
			method: 'GET',
			url: `${url}`,
			failOnStatusCode: false,
		}).as('verifyInfo')

		cy.get('@verifyInfo').then(response => {
			const responseBodyObjectLength = Object.keys(response.body).length

			console.log(response)
			expect(response.status).to.equal(200)
			expect(responseBodyObjectLength).to.be.equal(4)
			expect(response.body.success).to.be.a('boolean')
			expect(response.body.errorMessage).to.be.null
			expect(response.body.hasWebAccount).to.be.a('boolean')
			expect(response.body.memberFound).to.be.a('boolean')
		})
	})
})
