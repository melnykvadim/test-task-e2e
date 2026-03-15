import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/page.manager';

const baseURL = process.env.URL as string;

test.beforeEach(async ({ page }) => {
    await page.goto(baseURL + 'moisturizer');

})

test('checkout page should be opened', async ({ page }) => {
    const pm = new PageManager(page)
    const cheapestProduct = await pm.onProductsPage().getCheapestProductByName('aloe')
    await pm.onProductsPage().clickAddBtn(cheapestProduct.index)
    await pm.onProductsPage().clickCartBtn()
    await expect(pm.onCheckoutPage().pageTitleLocator).toHaveText('Checkout')
    expect(page.url()).toBe(baseURL + 'cart')
})