import { Locator, Page } from "@playwright/test"

export class CheckoutPage {
    private readonly page: Page;
    readonly itemCartLocator: Locator
    readonly pageTitleLocator: Locator
    constructor(page: Page) {
        this.page = page;
        this.itemCartLocator = this.page.locator('.table tbody tr')
        this.pageTitleLocator = this.page.locator('h2')
    }

    async getItemsInCart() {
        return this.itemCartLocator.evaluateAll(rows =>
            rows.map(row => ({
                name: row.querySelectorAll('td')[0].innerText,
                price: Number(row.querySelectorAll('td')[1].innerText)
            }))
        );
    }

    async clickPayWithCardBtn() {
        await this.page.locator('button', { hasText: "Pay with Card" }).click()
    }
}