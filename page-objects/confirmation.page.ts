import { Page, Locator } from "@playwright/test";
export class ConfirmationPage {
    private readonly page: Page;
    readonly pageTitleLocator: Locator
    readonly confirmationMessagelocator: Locator
    constructor(page: Page) {
        this.page = page;
        this.pageTitleLocator = this.page.locator('h2')
        this.confirmationMessagelocator = this.page.locator('div p.text-justify')
    }
}