describe('API - Tiny Steps Reflection Question Bank Post', () => {
	const url = `${Cypress.env('MEMBER_BASE_URL')}`
	const key = `${Cypress.env('DEV_SECURE_API_KEY')}`

	beforeEach('Send Login API Request', () => {
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

	it('Tiny Step Reflection Question Post 200 Response', () => {
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
				method: 'POST',
				url:
					url +
					'/member/' +
					salesforceId +
					'/tiny-steps/53023/tiny-step-reflection',
				body: {
					sentimentQuestionText: 'How did you feel about your Tiny Step?',
					sentimentQuestionResponse: 'Good',
					tinyStepReflectionQuestionResponses: [
						{
							tinyStepReflectionQuestionBankName: 'good test bank 1',
							tinyStepReflectionQuestionId: 2,
							sortOrder: 1,
							questionTextEnglish: 'Here is good question 1',
							questionTextSpanish: null,
							questionPrompts: [
								'Good Q1 Answer 1 ...',
								'Good Q1 Answer 2 ...',
								'Good Q1 Answer 3 ...',
							],
							questionResponses: null,
							questionText: 'Here is good question 1',
							responseText: 'Good Q1 Answer 2 more Q1 info',
						},
						{
							tinyStepReflectionQuestionBankName: 'good test bank 1',
							tinyStepReflectionQuestionId: 3,
							sortOrder: 2,
							questionTextEnglish: 'Here is good question 2',
							questionTextSpanish: null,
							questionPrompts: [
								'Good Q2 Answer 1 ...',
								'Good Q2 Answer 2 ...',
								'Good Q2 Answer 3 ...',
							],
							questionResponses: null,
							questionText: 'Here is good question 2',
							responseText: 'Good Q2 Answer 2 more Q2 info',
						},
						{
							tinyStepReflectionQuestionBankName: 'good test bank 1',
							tinyStepReflectionQuestionId: 1,
							sortOrder: 3,
							questionTextEnglish: 'Here is good question 3',
							questionTextSpanish: null,
							questionPrompts: [
								'Good Q3 Answer 1 ...',
								'Good Q3 Answer 2 ...',
								'Good Q3 Answer 3 ...',
							],
							questionResponses: null,
							questionText: 'Here is good question 3',
							responseText: 'Good Q3 Answer 2 more Q3 info',
						},
					],
				},
				headers: {
					brand: 'Pack Health',
					authorization: 'Bearer ' + token,
				},
				failOnStatusCode: false,
			}).as('tinyStepPostInfo')

			cy.get('@tinyStepPostInfo').then(response => {
				const responseBodyObjectLength = Object.keys(response.body).length
				const reflectionQuestionResponseIdsArrayLength = Object.keys(
					response.body.tinyStepReflectionQuestionResponseIds
				).length

				console.log(response)
				expect(response.status).to.equal(200)
				expect(responseBodyObjectLength).to.be.equal(4)
				expect(response.body.errorMessage).to.be.null
				expect(response.body.success).to.be.a('boolean')
				expect(response.body.tinyStepReflectionId).to.be.a('string')
				expect(response.body.tinyStepReflectionQuestionResponseIds).to.be.a(
					'array'
				)
				expect(reflectionQuestionResponseIdsArrayLength).to.be.equal(3)
				expect(response.body.tinyStepReflectionQuestionResponseIds[0]).to.be.a(
					'string'
				)
				expect(response.body.tinyStepReflectionQuestionResponseIds[1]).to.be.a(
					'string'
				)
				expect(response.body.tinyStepReflectionQuestionResponseIds[2]).to.be.a(
					'string'
				)
			})
		})
	})

	it('Tiny Step Reflection Question GET 200 Response', () => {
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
					'/tiny-steps/53023/tiny-step-reflection',
				headers: {
					brand: 'Pack Health',
					authorization: 'Bearer ' + token,
				},
				failOnStatusCode: false,
			}).as('tinyStepGetInfo')

			cy.get('@tinyStepGetInfo').then(response => {
				const responseBodyObjectLength = Object.keys(response.body).length
				const reflectionResponseArrayLength = Object.keys(
					response.body.tinyStepReflectionResponse
				).length

				console.log(response)
				expect(response.status).to.equal(200)
				expect(responseBodyObjectLength).to.be.equal(3)
				expect(response.body.errorMessage).to.be.null
				expect(response.body.success).to.be.a('boolean')
				expect(response.body.tinyStepReflectionResponse).to.be.a('array')
				expect(reflectionResponseArrayLength).to.be.equal(3)
				expect(
					response.body.tinyStepReflectionResponse[0].questionText
				).to.be.a('string')
				expect(
					response.body.tinyStepReflectionResponse[0].responseText
				).to.be.a('string')
				expect(
					response.body.tinyStepReflectionResponse[0].sentimentQuestionResponse
				).to.be.a('string')
				expect(
					response.body.tinyStepReflectionResponse[0].sentimentQuestionText
				).to.be.a('string')
				expect(
					response.body.tinyStepReflectionResponse[0]
						.tinyStepReflectionQuestionResponseId
				).to.be.a('string')
			})
		})
	})

	after('Reset member reflection information', () => {
		cy.request({
			method: 'POST',
			url: 'https://qh38tx3i85.execute-api.us-east-1.amazonaws.com/v1/test/reset-member',
			headers: { 'x-api-key': key },
			body: {
				email: 'tim.hatcher+hi1@packhealth.com',
				brand: 'Pack Health',
				tinyStepId: '53023',
				resetReflection: true,
			},
		})
	})
})
