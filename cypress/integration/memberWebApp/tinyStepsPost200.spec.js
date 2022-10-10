describe('API - Tiny Steps Post', () => {
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

	it('Tiny Step Post 200 Response', () => {
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
				url: url + '/member/' + salesforceId + '/tiny-steps/53023',
				body: {
					notes: null,
					modifiedBy: '0038H00000BSPj6QAH',
					isLegacyData: false,
					tinyStepId: '56077',
					memberId: '0038H00000BSPj6QAH',
					actionDescription: 'I want to walk more',
					prompt: 'get home from work',
					celebration: 'cooling off in the shade',
					targetValue: 5,
					actualValue: null,
					source: 'Health Advisor',
					endDate: null,
					createdDate: '2022-01-30T19:57:31+00:00',
					isAchieved: null,
					hideTSAlert: false,
					feedback: null,
					feedbackUserId: null,
					feedbackSentDate: null,
					feedbackPhluids: [],
					ordinalPosition: '1',
					ageInDays: 5,
				},
				headers: {
					brand: 'Pack Health',
					authorization: 'Bearer ' + token,
				},
				failOnStatusCode: false,
			}).as('tinyStepPostInfo')

			cy.get('@tinyStepPostInfo').then(response => {
				const responseBodyObjectLength = Object.keys(response.body).length

				console.log(response)
				expect(response.status).to.equal(200)
				expect(responseBodyObjectLength).to.be.equal(2)
				expect(response.body.success).to.be.a('boolean')
				expect(response.body.modifiedDate).to.be.a('string')
			})
		})
	})
})
