import { Page } from "@playwright/test";
import { IPaymentForm } from "../../interfaces/paymentForm";
export class PaymentForm {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page
    }

    async fillPaymentForm(paymentData: IPaymentForm): Promise<void> {
        const frame = this.page.frameLocator('body iframe')
        await frame.locator('input[id="email"]').fill(paymentData.email)
        await frame.locator('input[id="card_number"]').fill(paymentData.cardNumber)
        await frame.locator('input[id="cc-exp"]').fill(paymentData.expirationDate)
        await frame.locator('input[id="cc-csc"]').fill(paymentData.cvc)
    }

    async sumbitPaymentForm() {
        const frame = this.page.frameLocator('body iframe')
        await frame.locator('button[id="submitButton"]').click()
    }
}