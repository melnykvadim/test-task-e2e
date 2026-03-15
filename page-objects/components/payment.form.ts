import { Page, FrameLocator, Locator } from "@playwright/test";
import { IPaymentForm } from "../../interfaces/paymentForm";
export class PaymentForm {
    private readonly frame: FrameLocator;
    private readonly submitButtonLocator: Locator;
    constructor(private readonly page: Page) {
        this.frame = this.page.frameLocator('body iframe');
        this.submitButtonLocator = this.frame.locator('button[id="submitButton"]');
    }

    async fillPaymentForm(paymentData: IPaymentForm): Promise<void> {
        await this.frame.locator('input[id="email"]').fill(paymentData.email)
        await this.frame.locator('input[id="card_number"]').fill(paymentData.cardNumber)
        await this.frame.locator('input[id="cc-exp"]').fill(paymentData.expirationDate)
        await this.frame.locator('input[id="cc-csc"]').fill(paymentData.cvc)
    }

    async submitPaymentForm() {
        await this.submitButtonLocator.click()
    }

    async getSubmitButtonText(): Promise<string> {
        return this.submitButtonLocator.innerText()
    }

}