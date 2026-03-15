import { Page } from "@playwright/test";

export class NavigationPage {
    constructor(private readonly page: Page) { }

    async moisturizersPage() {
        await this.page.locator('.btn', { hasText: "Buy moisturizers" }).click()
        await this.page.waitForLoadState("networkidle")
    }

    async sunscreensPage() {
        await this.page.locator('.btn', { hasText: "Buy sunscreens" }).click()
        await this.page.waitForLoadState("networkidle")
    }
}