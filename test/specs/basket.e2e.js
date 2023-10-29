const { expect, browser, $ } = require('@wdio/globals')

describe('Basket test', () => {
    beforeEach(async () => {
        await browser.url(`http://localhost:3000/`)
        await browser.setCookies({
            name: 'welcomebanner_status',
            value: 'dismiss'
        })

        const email = `b@b.b`
        const password = 'test1'

        await browser.url(`http://localhost:3000/#/login`)


        await $('#email').setValue(email)
        await $('#password').setValue(password)
        await $('#loginButton').click()
    })

    it('adds and remove first item from basket', async () => {
        await browser.url(`http://localhost:3000/#/search`)

        const addToBasketButton = await $('button=Add to Basket')

        await addToBasketButton.click()

        await $('button[routerlink="/basket"]').click()

        const basketTableRow = await $('.mat-cell')

        expect(basketTableRow).toBeElementsArrayOfSize(1)

        await $('svg[data-icon="trash-alt"]').click()
    })
})

