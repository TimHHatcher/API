describe('API - Motivation of the Day', () => {
	const url = `${Cypress.env('MEMBER_BASE_URL')}`

	before('Send Login API Request', () => {
		cy.request({
			method: 'POST',
			url: url + '/user/login?',
			body: {
				email: 'tim.hatcher+hi2@packhealth.com',
				password: 'Test123!',
				brand: 'Pack Health',
				eventTypeCode: '',
				deviceInfo: {
					userAgent:
						'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
					os: 'Windows',
					browser: 'Chrome',
					device: 'Unknown',
					os_version: 'windows-10',
					browser_version: '97.0.4692.71',
				},
				loginSource: 'Cognito',
				logoutSource: null,
			},
			failOnStatusCode: false,
		}).as('loginInfo')
	})

	it('Motivation of the Day 200 Response - Member has a motivation of the day message', () => {
		cy.get('@loginInfo').then(response => {
			const decodedObject = JSON.parse(
				atob(response.body.signInResponsePayload)
			)
			const token = decodedObject.signInUserSession.idToken.jwtToken
			const salesforceId =
				decodedObject.signInUserSession.idToken.payload['custom:salesforceId']

			console.log(token)
			console.log(salesforceId)

			cy.request({
				method: 'GET',
				url: url + '/member/' + salesforceId + '/motivation-of-the-day',
				headers: {
					brand: 'Pack Health',
					authorization: 'Bearer ' + token,
				},
				failOnStatusCode: false,
			}).as('motdInfo')

			cy.get('@motdInfo').then(response => {
				const responseBodyObjectLength = Object.keys(response.body).length

				console.log(response)
				expect(response.status).to.equal(200)
				expect(responseBodyObjectLength).to.be.equal(3)
				expect(response.body.success).to.be.a('boolean')
				expect(response.body.errorMessage).to.be.null
				expect(response.body.motivationOfTheDay).to.be.null
			})
		})
	})
})
