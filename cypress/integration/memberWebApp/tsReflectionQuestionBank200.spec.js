describe('API - Tiny Steps Reflection Question Banks', () => {
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

	it('Tiny Step Reflection Question Banks 200 Response', () => {
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
				url:
					url +
					'/member/' +
					salesforceId +
					'/tiny-steps/reflection-question-banks',
				headers: {
					brand: 'Pack Health',
					authorization: 'Bearer ' + token,
				},
				failOnStatusCode: false,
			}).as('tinyStepInfo')

			cy.get('@tinyStepInfo').then(response => {
				const responseBodyObjectLength = Object.keys(response.body).length
				const reflectionBanksObjectLength = Object.keys(
					response.body.reflectionBanks
				).length
				const badTestBankArrayEntryLength = Object.keys(
					response.body.reflectionBanks.BAD_TEST_BANK[0]
				).length
				const badTestBankQuestionPromptsLength = Object.keys(
					response.body.reflectionBanks.BAD_TEST_BANK[0].questionPrompts
				).length

				console.log(response)
				expect(response.status).to.equal(200)
				expect(responseBodyObjectLength).to.be.equal(3)
				expect(response.body.errorMessage).to.be.null
				expect(response.body.reflectionBanks).to.be.a('object')
				expect(reflectionBanksObjectLength).to.be.equal(2)
				expect(response.body.success).to.be.a('boolean')
				expect(response.body.reflectionBanks.BAD_TEST_BANK).to.be.a('array')
				expect(badTestBankArrayEntryLength).to.be.equal(7)
				expect(response.body.reflectionBanks.BAD_TEST_BANK[0]).to.be.a('object')
				expect(
					response.body.reflectionBanks.BAD_TEST_BANK[0].questionPrompts
				).to.be.a('array')
				expect(badTestBankQuestionPromptsLength).to.be.equal(3)
				expect(
					response.body.reflectionBanks.BAD_TEST_BANK[0].questionPrompts[0]
				).to.be.a('string')
				expect(
					response.body.reflectionBanks.BAD_TEST_BANK[0].questionPrompts[1]
				).to.be.a('string')
				expect(
					response.body.reflectionBanks.BAD_TEST_BANK[0].questionPrompts[1]
				).to.be.a('string')
				expect(response.body.reflectionBanks.BAD_TEST_BANK[0].questionResponses)
					.to.be.null
				expect(
					response.body.reflectionBanks.BAD_TEST_BANK[0].questionTextEnglish
				).to.be.a('string')
				expect(
					response.body.reflectionBanks.BAD_TEST_BANK[0].questionTextSpanish
				).to.be.null
				expect(
					response.body.reflectionBanks.BAD_TEST_BANK[0].sortOrder
				).to.be.a('number')
				expect(
					response.body.reflectionBanks.BAD_TEST_BANK[0]
						.tinyStepReflectionQuestionBankName
				).to.be.a('string')
				expect(
					response.body.reflectionBanks.BAD_TEST_BANK[0]
						.tinyStepReflectionQuestionId
				).to.be.a('number')
				expect(response.body.reflectionBanks.GOOD_TEST_BANK).to.be.a('array')
			})
		})
	})
})
