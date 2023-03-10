describe('API - Hero Image', () => {
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

	it('Hero image 200 Response - Primary conidtion and brand with hero image assigned returns success with images', () => {
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
					'/hero-image/eyJtZW1iZXJJZCI6IjAwMzhIMDAwMDBCU1BtV1FBWCIsIm1vZHVsZUlkIjoiNTAwOEgwMDAwMDNleEh1UUFJIiwibGVzc29uUGhsdWlkIjoiM0xTNUZCRDQ2OTAwMkRCRiIsInNob3VsZERpc3BsYXlTdXJ2ZXkiOnRydWV9',
				headers: {
					brand: 'Pack Health',
					authorization: 'Bearer ' + token,
				},
				failOnStatusCode: false,
			}).as('heroImageInfo')

			cy.get('@heroImageInfo').then(response => {
				const responseBodyObjectLength = Object.keys(response.body).length
				const heroImageObjectLength = Object.keys(
					response.body.heroImageInfo
				).length

				console.log(response)
				expect(response.status).to.equal(200)
				expect(responseBodyObjectLength).to.be.equal(3)
				expect(heroImageObjectLength).to.be.equal(2)
				expect(response.body.success).to.be.a('boolean')
				expect(response.body.errorMessage).to.be.null
				expect(response.body.heroImageInfo.heroImageUrl).to.be.a('string')
				expect(response.body.heroImageInfo.heroImageAltText).to.be.null
			})
		})
	})
})
