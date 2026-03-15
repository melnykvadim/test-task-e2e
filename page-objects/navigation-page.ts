import { Page } from "@playwright/test";

export class NavigationPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page
    }

    async moisturizersPage() {
        await this.page.locator('.btn', { hasText: "Buy moisturizers" }).click()
        await this.page.waitForLoadState("networkidle")
    }

    async sunscreensPage() {
        await this.page.locator('.btn', { hasText: "Buy sunscreens" }).click()
        await this.page.waitForLoadState("networkidle")
    }
}