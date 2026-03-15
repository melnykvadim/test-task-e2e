import { Locator, Page } from "@playwright/test";
import { MainScreen } from "./main.page";
import { NavigationPage } from "./navigation.page";
import { ProductsPage } from "./products.page";
import { CheckoutPage } from "./checkout.page";
import { ConfirmationPage } from "./confirmation.page";
import { PaymentForm } from "./components/payment.form";

export class PageManager {
    private readonly mainScreen: MainScreen;
    private readonly navigationPage: NavigationPage
    private readonly productsPage: ProductsPage
    private readonly checkoutPage: CheckoutPage
    private readonly confirmationPage: ConfirmationPage
    protected readonly paymentForm: PaymentForm
    constructor(private readonly page: Page) {
        this.mainScreen = new MainScreen(this.page)
        this.navigationPage = new NavigationPage(this.page)
        this.productsPage = new ProductsPage(this.page)
        this.checkoutPage = new CheckoutPage(this.page)
        this.confirmationPage = new ConfirmationPage(this.page)
        this.paymentForm = new PaymentForm(this.page)
    }

    navigateTo() {
        return this.navigationPage
    }

    onMainScreen() {
        return this.mainScreen
    }

    onProductsPage() {
        return this.productsPage
    }
    onCheckoutPage() {
        return this.checkoutPage
    }
    onConfirmationPage() {
        return this.confirmationPage
    }
    onPaymentForm() {
        return this.paymentForm
    }
}