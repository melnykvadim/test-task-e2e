import { test, expect } from '@playwright/test';
import { NavigationPage } from '../page-objects/navigation-page';
import { MainScreen } from '../page-objects/main-page';
import { ProductsPage } from '../page-objects/products-page';
import { CheckoutPage } from '../page-objects/checkout.page';
import { PaymentForm } from '../page-objects/components/payment.form';
import { ConfirmationPage } from '../page-objects/confirmation.page';
import { validPaymentCardData } from '../test-data/payment.card.data';
import { PageManager } from '../page-objects/page.manager';

const baseURL = process.env.URL as string;

test.beforeEach(async ({ page }) => {
  await page.goto(baseURL);
})

test('user can open moisturizers page', async ({ page }) => {
  const pm = new PageManager(page)
  await pm.navigateTo().moisturizersPage()
  await expect(pm.onProductsPage().pageTitleLocator).toHaveText('Moisturizers')
  expect(page.url()).toBe(baseURL + 'moisturizer')
});

test('user can open sunscreens page', async ({ page }) => {
  const pm = new PageManager(page)
  await pm.navigateTo().sunscreensPage()
  await expect(pm.onProductsPage().pageTitleLocator).toHaveText('Sunscreens')
  expect(page.url()).toBe(baseURL + 'sunscreen')
});

test('open moisturizers page if temperature is less than 19', async ({ page }) => {
  const pm = new PageManager(page)
  while (Number(await pm.onMainScreen().getCurrentTemp()) < 19) {
    await page.reload()
  }
  await pm.navigateTo().moisturizersPage()
})

test('open sunscreens page if temperature is greater than 34', async ({ page }) => {
  const pm = new PageManager(page)
  while (Number(await pm.onMainScreen().getCurrentTemp()) > 34) {
    await page.reload()
  }
  await pm.navigateTo().sunscreensPage()
})

test('by 2 items in moisturizers', async ({ page }) => {
  const pm = new PageManager(page)

  await page.goto(baseURL + 'moisturizer');
  const allProducts = await pm.onProductsPage().getAllProducts()
  const aloeProducts = await pm.onProductsPage().filterProductsByName(allProducts, 'aloe')
  const almondProducts = await pm.onProductsPage().filterProductsByName(allProducts, 'almond')

  const chipestAloeProduct = await pm.onProductsPage().getCheapestProduct(aloeProducts)
  const chipestAlmondProduct = await pm.onProductsPage().getCheapestProduct(almondProducts)

  await pm.onProductsPage().clickAddBtn(chipestAloeProduct.index)
  await pm.onProductsPage().clickAddBtn(chipestAlmondProduct.index)

  await expect(pm.onProductsPage().cartlocator).toContainText('2 item(s)')
  await pm.onProductsPage().clickCartBtn()
  await expect(pm.onCheckoutPage().pageTitleLocator).toHaveText('Checkout')

  const cartItems = await pm.onCheckoutPage().getItemsInCart()

  expect(cartItems).toContainEqual(
    expect.objectContaining({
      name: chipestAlmondProduct.name,
      price: chipestAlmondProduct.price
    })
  );

  expect(cartItems).toContainEqual(
    expect.objectContaining({
      name: chipestAloeProduct.name,
      price: chipestAloeProduct.price
    })
  );

  await pm.onCheckoutPage().clickPayWithCardBtn()
  await pm.onPaymentForm().fillPaymentForm(validPaymentCardData)
  await pm.onPaymentForm().sumbitPaymentForm()
  await expect(pm.onConfirmationPage().pageTitleLocator).toHaveText('PAYMENT SUCCESS')
  await expect(pm.onConfirmationPage().confirmationMessagelocator).toHaveText(
    'Your payment was successful. You should receive a follow-up call from our sales team.'
  )

})

test('by 2 items in sunscreens', async ({ page }) => {
  const pm = new PageManager(page)

  await page.goto(baseURL + 'sunscreen');
  const chipestSPF50Product = await pm.onProductsPage().getCheapestProductByName('SPF-50')
  const chipestSPF30Product = await pm.onProductsPage().getCheapestProductByName('SPF-30')

  await pm.onProductsPage().clickAddBtn(chipestSPF50Product.index)
  await pm.onProductsPage().clickAddBtn(chipestSPF30Product.index)
  await expect(pm.onProductsPage().cartlocator).toContainText('2 item(s)')
  await pm.onProductsPage().clickCartBtn()

  await expect(pm.onCheckoutPage().pageTitleLocator).toHaveText('Checkout')

  const cartItems = await pm.onCheckoutPage().getItemsInCart()

  expect(cartItems).toContainEqual(
    expect.objectContaining({
      name: chipestSPF30Product.name,
      price: chipestSPF30Product.price
    })
  );

  expect(cartItems).toContainEqual(
    expect.objectContaining({
      name: chipestSPF50Product.name,
      price: chipestSPF50Product.price
    })
  );

  await pm.onCheckoutPage().clickPayWithCardBtn()
  await pm.onPaymentForm().fillPaymentForm(validPaymentCardData)
  await pm.onPaymentForm().sumbitPaymentForm()

  await expect(pm.onConfirmationPage().pageTitleLocator).toHaveText('PAYMENT SUCCESS')
  await expect(pm.onConfirmationPage().confirmationMessagelocator).toHaveText(
    'Your payment was successful. You should receive a follow-up call from our sales team.'
  )
})

