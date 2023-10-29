const { expect, browser, $ } = require('@wdio/globals')

describe('Authentication test', () => {
    beforeEach(async () => {
        await browser.url(`http://localhost:3000/`)
        await browser.setCookies({
            name: 'welcomebanner_status',
            value: 'dismiss'
        })
    })
    it('register using empty data', async () => {
        await browser.url(`http://localhost:3000/#/register`)
        await $('#registerButton').click()

        // expect link to does not change
        await expect(browser).toHaveUrl('http://localhost:3000/#/register')
    })

    it('register using invalid email', async () => {
        const email = 'invalid-email'
        const password = 'pass123'
        await browser.url(`http://localhost:3000/#/register`)

        await $('#emailControl').setValue(email)
        await $('#passwordControl').setValue(password)
        await $('#repeatPasswordControl').setValue(password)

        await $('#registerButton').click()

        const errorElement = await $('mat-error')
        await expect(errorElement).toHaveText('Email address is not valid.')
    })

    it('register using two different passwords', async () => {
        const email = 'test@example.com'
        const password = 'pass123'
        const repeatedPassword = 'pass1234'

        await browser.url(`http://localhost:3000/#/register`)

        await $('#emailControl').setValue(email)
        await $('#passwordControl').setValue(password)
        await $('#repeatPasswordControl').setValue(repeatedPassword)

        await $('#registerButton').click()

        const errorElement = await $('mat-error')
        await expect(errorElement).toHaveText('Passwords do not match')
    })

    it('successfully register and log in', async () => {
        const email = `test${Date.now()}@example.com`
        const password = 'pass123'
        const securityQuestion = 'Your eldest siblings middle name?'
        const securityAnswer = 'Ana'

        await browser.url(`http://localhost:3000/#/register`)

        await $('#emailControl').setValue(email)
        await $('#passwordControl').setValue(password)
        await $('#repeatPasswordControl').setValue(password)
        await $('[name="securityQuestion"]').click()
        await $(`span=${securityQuestion}`).click()
        await $('#securityAnswerControl').setValue(securityAnswer)

        await $('#registerButton').click()

        const snackBarContent = await $('.mat-simple-snack-bar-content')

        expect(snackBarContent).toHaveText('Registration completed successfully. You can now log in.')

        await $('#email').setValue(email)
        await $('#password').setValue(password)
        await $('#loginButton').click()

        await expect(browser).toHaveUrl('http://localhost:3000/#/search')
    })

    it('log in using wrong pass', async () => {
        const email = `test@example.com`
        const password = 'thatPassIsInvalid'

        await browser.url(`http://localhost:3000/#/login`)


        await $('#email').setValue(email)
        await $('#password').setValue(password)
        await $('#loginButton').click()

        const errorElement = await $('.error')
        await expect(errorElement).toHaveText('Invalid email or password.')
        await expect(browser).toHaveUrl('http://localhost:3000/#/login')
    })
})

