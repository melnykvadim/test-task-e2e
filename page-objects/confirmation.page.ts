import { Page, Locator } from "@playwright/test";
export class ConfirmationPage {
    readonly pageTitleLocator: Locator
    readonly confirmationMessagelocator: Locator
    constructor(private readonly page: Page) {
        this.pageTitleLocator = this.page.locator('h2')
        this.confirmationMessagelocator = this.page.locator('div p.text-justify')
    }
}