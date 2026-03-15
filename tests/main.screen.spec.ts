import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/page.manager';

const baseURL = process.env.URL as string;

test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
})

test('open moisturizers page if temperature is less than 19', async ({ page }) => {
    const pm = new PageManager(page)
    while (Number(await pm.onMainScreen().getCurrentTemp()) > 19) {
        await page.reload()
    }
    await pm.navigateTo().moisturizersPage()
    await expect(pm.onProductsPage().pageTitleLocator).toHaveText('Moisturizers')
    expect(page.url()).toBe(baseURL + 'moisturizer')
})

test('open sunscreens page if temperature is greater than 34', async ({ page }) => {
    const pm = new PageManager(page)
    while (Number(await pm.onMainScreen().getCurrentTemp()) < 34) {
        await page.reload()
    }
    await pm.navigateTo().sunscreensPage()
    await expect(pm.onProductsPage().pageTitleLocator).toHaveText('Sunscreens')
    expect(page.url()).toBe(baseURL + 'sunscreen')
})

