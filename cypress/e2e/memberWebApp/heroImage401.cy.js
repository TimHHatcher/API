describe('API - Hero Image', () => {
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

	it('Hero image 401 Response', () => {
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
					'/member/FakeMember/hero-image/eyJtZW1iZXJJZCI6IjAwMzJDMDAwMDBiV1RHd1FBTyIsIm1vZHVsZUlkIjoiNTAwMkMwMDAwMEFhTnlDUUFWIiwibGVzc29uUGhsdWlkIjoiM0xTNUU5NUY5N0UwMERFNyIsInNob3VsZERpc3BsYXlTdXJ2ZXkiOnRydWUsIm9yaWdpbiI6InBhY2tfaGVhbHRoX3BvcnRhbCJ9',
				headers: {
					brand: 'Pack Health',
					authorization: 'Bearer ' + token,
				},
				failOnStatusCode: false,
			}).as('heroImageInfo')

			cy.get('@heroImageInfo').then(response => {
				console.log(response)
				expect(response.status).to.equal(401)
				expect(response.body.message).to.equal('Unauthorized')
			})
		})
	})
})
