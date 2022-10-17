describe('API - Help Section', () => {
	const url = `${Cypress.env('MEMBER_BASE_URL')}`

	before('Send Login API Request', () => {
		cy.request({
			method: 'POST',
			url: url + '/user/login?',
			body: {
				email: 'tim.hatcher+hi1@packhealth.com',
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

	it('Help Section 200 Response', () => {
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
				url: url + '/member/' + salesforceId + '/help-section',
				headers: {
					brand: 'Pack Health',
					authorization: 'Bearer ' + token,
				},
				failOnStatusCode: false,
			}).as('helpSectionInfo')

			cy.get('@helpSectionInfo').then(response => {
				const responseBodyLength = Object.keys(response.body).length
				const helpSectionArrayLength = Object.keys(
					response.body.helpSection[0]
				).length
				const categoryQuestionsArrayLength = Object.keys(
					response.body.helpSection[0].questions[0]
				).length

				console.log(response)
				expect(response.status).to.equal(200)
				expect(responseBodyLength).to.be.equal(3)
				expect(response.body.errorMessage).to.be.null
				expect(response.body.helpSection).to.be.a('array')
				expect(response.body.success).to.be.a('boolean')
				expect(helpSectionArrayLength).to.be.equal(6)
				expect(response.body.helpSection[0].categoryCreatedDate).to.be.a(
					'string'
				)
				expect(response.body.helpSection[0].categoryIconAltText).to.be.a(
					'string'
				)
				expect(response.body.helpSection[0].categoryIconURL).to.be.a('string')
				expect(response.body.helpSection[0].categoryImageDescription).to.be.a(
					'string'
				)
				expect(response.body.helpSection[0].categoryTitle).to.be.a('string')
				expect(response.body.helpSection[0].questions).to.be.a('array')
				expect(categoryQuestionsArrayLength).to.be.equal(3)
				expect(response.body.helpSection[0].questions[0].created_date).to.be.a(
					'string'
				)
				expect(response.body.helpSection[0].questions[0].questionBody).to.be.a(
					'string'
				)
				expect(response.body.helpSection[0].questions[0].questionTitle).to.be.a(
					'string'
				)
			})
		})
	})
})
