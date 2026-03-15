import { Locator, Page } from "@playwright/test"

export class CheckoutPage {
    readonly itemCartLocator: Locator
    readonly pageTitleLocator: Locator
    readonly totalPriceLocator: Locator
    constructor(private readonly page: Page) {
        this.itemCartLocator = this.page.locator('.table tbody tr')
        this.pageTitleLocator = this.page.locator('h2')
        this.totalPriceLocator = this.page.locator('p[id="total"]')
    }

    async getTotalPrice(): Promise<string> {
        return this.totalPriceLocator.innerText()
    }

    async getItemsInCart() {
        return this.itemCartLocator.evaluateAll(rows =>
            rows.map(row => ({
                name: row.querySelectorAll('td')[0].innerText,
                price: Number(row.querySelectorAll('td')[1].innerText)
            }))
        );
    }

    async clickPayWithCardBtn(): Promise<void> {
        await this.page.locator('button', { hasText: "Pay with Card" }).click()
    }
}