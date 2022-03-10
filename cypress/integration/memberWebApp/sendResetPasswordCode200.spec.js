describe('API - Send Reset Password Code', () => {
	it('Verify 200 Response', () => {
		cy.request({
			method: 'GET',
			url: 'https://z8m0fpo6yl.execute-api.us-east-1.amazonaws.com/v1/user/tim.hatcher+hi1@packhealth.com/send-reset-password-code',
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
