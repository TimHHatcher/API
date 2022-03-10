describe('API - Coaching Info', () => {
	before('Send Login API Request', () => {
		cy.request({
			method: 'POST',
			url: 'https://bad-z8m0fpo6yl.execute-api.us-east-1.amazonaws.com/v1/user/login?',
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

	it('Coaching Info 200 Response', () => {
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
					'https://z8m0fpo6yl.execute-api.us-east-1.amazonaws.com/v1/member/' +
					salesforceId +
					'/coaching-info',
				headers: {
					brand: 'Pack Health',
					authorization: 'Bearer ' + token,
				},
				failOnStatusCode: false,
			}).as('coachingInfo')

			cy.get('@coachingInfo').then(response => {
				const responseBodyLength = Object.keys(response.body).length
				const coachingInfoObjectLength = Object.keys(
					response.body.coachingInfo
				).length

				console.log(response)
				expect(response.status).to.equal(200)
				expect(responseBodyLength).to.be.equal(2)
				expect(coachingInfoObjectLength).to.be.equal(14)
				expect(response.body.success).to.be.a('boolean')
				expect(response.body.coachingInfo.cadence).to.be.a('string')
				expect(response.body.coachingInfo.calendarURL).to.be.a('string')
				expect(response.body.coachingInfo.coachBio).to.be.a('string')
				expect(response.body.coachingInfo.coachEmail).to.be.a('string')
				expect(response.body.coachingInfo.coachLastName).to.be.a('string')
				expect(response.body.coachingInfo.coachName).to.be.a('string')
				expect(response.body.coachingInfo.coachPhone).to.be.a('string')
				expect(response.body.coachingInfo.coachPicture).to.be.a('string')
				expect(response.body.coachingInfo.cadence).to.be.a('string')
				expect(response.body.coachingInfo.currentLesson).to.be.a('string')
				expect(response.body.coachingInfo.currentModuleStatus).to.be.a('string')
				expect(response.body.coachingInfo.engagementDOTW).to.be.a('string')
				expect(response.body.coachingInfo.lessonTitle).to.be.a('string')
				expect(response.body.coachingInfo.nextCallDate).to.be.null
				expect(response.body.coachingInfo.nickname).to.be.a('string')
			})
		})
	})
})
