const url = `${Cypress.env("MEMBER_BASE_URL")}/user/tim.hatcher+hi1@packhealth.com/send-reset-password-code`;
describe('API - Send Reset Password Code', () => {
	it('Verify 200 Response', () => {
		cy.request({
			method: 'GET',
			url: `${url}`,
			failOnStatusCode: false,
		}).as('passwordCodeInfo')

		cy.get('@passwordCodeInfo').then(response => {
			const responseBodyObjectLength = Object.keys(response.body).length

			console.log(response)
			expect(response.status).to.equal(200)
			expect(responseBodyObjectLength).to.be.equal(4)
			expect(response.body.success).to.be.a('boolean')
			expect(response.body.errorMessage).to.be.null
			expect(response.body.userExists).to.be.a('boolean')
			expect(response.body.verificationCodeSent).to.be.a('boolean')
		})
	})
})
