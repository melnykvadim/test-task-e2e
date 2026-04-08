import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/page.manager';

const baseURL = process.env.URL as string;

test.beforeEach(async ({ page }) => {
    await page.goto(baseURL + 'moisturizer');

})

test.only('page has correct title', async ({ page }) => {
    console.log(baseURL)
    const pm = new PageManager(page)
    await expect(pm.onProductsPage().pageTitleLocator).toHaveText('Moisturizers')
})

test('cart is empty', async ({ page }) => {
    const pm = new PageManager(page)
    await expect(pm.onProductsPage().cartlocator).toHaveText('Cart - Empty')
})

test('cart has item(s)', async ({ page }) => {
    const pm = new PageManager(page)
    const cheapestProduct = await pm.onProductsPage().getCheapestProductByName('aloe')
    await pm.onProductsPage().clickAddBtn(cheapestProduct.index)
    await expect(pm.onProductsPage().cartlocator).toHaveText('Cart - 1 item(s)')
})