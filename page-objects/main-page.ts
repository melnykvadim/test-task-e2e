import { Page } from "@playwright/test"
export class MainScreen {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page
    }

    async getCurrentTemp(): Promise<string> {
        const currentTemp = await this.page.locator("[id='temperature']").textContent()
        if (currentTemp === null) {
            throw new Error('Temperature is not got. Please check')
        }
        return currentTemp.replace(/\D/g, "");
    }
}