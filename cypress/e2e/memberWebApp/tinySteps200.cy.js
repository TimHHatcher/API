describe('API - Tiny Steps', () => {
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

	it('Tiny Step 200 Response', () => {
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
				url: url + '/member/' + salesforceId + '/tiny-steps/',
				headers: {
					brand: 'Pack Health',
					authorization: 'Bearer ' + token,
				},
				failOnStatusCode: false,
			}).as('tinyStepInfo')

			cy.get('@tinyStepInfo').then(response => {
				const responseBodyObjectLength = Object.keys(response.body).length
				const tinyStepObjectLength = Object.keys(
					response.body.tinySteps[0]
				).length

				console.log(response)
				expect(response.status).to.equal(200)
				expect(responseBodyObjectLength).to.be.equal(2)
				expect(tinyStepObjectLength).to.be.equal(21)
				expect(response.body.success).to.be.a('boolean')
				expect(response.body.tinySteps).to.be.a('array')
				expect(response.body.tinySteps[0].actionDescription).to.be.a('string')
				expect(response.body.tinySteps[0].actualValue).to.be.null
				expect(response.body.tinySteps[0].ageInDays).to.be.a('number')
				expect(response.body.tinySteps[0].celebration).to.be.a('string')
				expect(response.body.tinySteps[0].createdDate).to.be.a('string')
				expect(response.body.tinySteps[0].endDate).to.be.null
				expect(response.body.tinySteps[0].feedback).to.be.null
				expect(response.body.tinySteps[0].feedbackSentDate).to.be.null
				expect(response.body.tinySteps[0].feedbackUserId).to.be.null
				expect(response.body.tinySteps[0].hideTSAlert).to.be.a('boolean')
				expect(response.body.tinySteps[0].hideTSFeedbackAlert).to.be.null
				expect(response.body.tinySteps[0].isAchieved).to.be.null
				expect(response.body.tinySteps[0].isLegacyData).to.be.a('boolean')
				expect(response.body.tinySteps[0].modifiedBy).to.be.a('string')
				expect(response.body.tinySteps[0].modifiedDate).to.be.a('string')
				expect(response.body.tinySteps[0].notes).to.be.null
				expect(response.body.tinySteps[0].ordinalPosition).to.be.a('string')
				expect(response.body.tinySteps[0].prompt).to.be.a('string')
				expect(response.body.tinySteps[0].source).to.be.a('string')
				expect(response.body.tinySteps[0].targetValue).to.be.a('number')
				expect(response.body.tinySteps[0].tinyStepId).to.be.a('string')
			})
		})
	})
})
