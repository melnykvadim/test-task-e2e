import { test, expect } from '@playwright/test';
import { validPaymentCardData } from '../test-data/payment.card.data';
import { PageManager } from '../page-objects/page.manager';

const baseURL = process.env.URL as string;

test.beforeEach(async ({ page }) => {
  await page.goto(baseURL);
})

test('user should buy 2 items in moisturizers', async ({ page }) => {
  const pm = new PageManager(page)

  await page.goto(baseURL + 'moisturizer');
  const chipestAloeProduct = await pm.onProductsPage().getCheapestProductByName('aloe')
  const chipestAlmondProduct = await pm.onProductsPage().getCheapestProductByName('almond')
  const expectedTotalPrice = chipestAloeProduct.price + chipestAlmondProduct.price

  await pm.onProductsPage().clickAddBtn(chipestAloeProduct.index)
  await pm.onProductsPage().clickAddBtn(chipestAlmondProduct.index)
  await pm.onProductsPage().clickCartBtn()
  const cartItems = await pm.onCheckoutPage().getItemsInCart()
  await expect(pm.onCheckoutPage().pageTitleLocator).toHaveText('Checkout')
  expect(await pm.onCheckoutPage().getTotalPrice()).toBe(`Total: Rupees ${expectedTotalPrice}`)
  expect(cartItems.length).toBe(2)
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
  expect(await pm.onCheckoutPage().getTotalPrice()).toEqual(`Total: Rupees ${expectedTotalPrice}`)

  await pm.onCheckoutPage().clickPayWithCardBtn()
  await pm.onPaymentForm().fillPaymentForm(validPaymentCardData)
  await pm.onPaymentForm().submitPaymentForm()
  expect(await pm.onPaymentForm().getSubmitButtonText()).toBe(`Pay INR ₹${expectedTotalPrice}.00`)
  await expect(pm.onConfirmationPage().pageTitleLocator).toHaveText('PAYMENT SUCCESS')
  await expect(pm.onConfirmationPage().confirmationMessagelocator).toHaveText(
    'Your payment was successful. You should receive a follow-up call from our sales team.'
  )

})

test('user should buy 2 items in sunscreens', async ({ page }) => {
  const pm = new PageManager(page)

  await page.goto(baseURL + 'sunscreen');
  const chipestSPF50Product = await pm.onProductsPage().getCheapestProductByName('SPF-50')
  const chipestSPF30Product = await pm.onProductsPage().getCheapestProductByName('SPF-30')
  const expectedTotalPrice = chipestSPF30Product.price + chipestSPF50Product.price

  await pm.onProductsPage().clickAddBtn(chipestSPF50Product.index)
  await pm.onProductsPage().clickAddBtn(chipestSPF30Product.index)
  await pm.onProductsPage().clickCartBtn()
  const cartItems = await pm.onCheckoutPage().getItemsInCart()
  expect(cartItems.length).toBe(2)
  await expect(pm.onCheckoutPage().pageTitleLocator).toHaveText('Checkout')
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

  expect(await pm.onCheckoutPage().getTotalPrice()).toEqual(`Total: Rupees ${expectedTotalPrice}`)
  await pm.onCheckoutPage().clickPayWithCardBtn()
  await pm.onPaymentForm().fillPaymentForm(validPaymentCardData)
  await pm.onPaymentForm().submitPaymentForm()

  expect(await pm.onPaymentForm().getSubmitButtonText()).toBe(`Pay INR ₹${expectedTotalPrice}.00`)
  await expect(pm.onConfirmationPage().pageTitleLocator).toHaveText('PAYMENT SUCCESS')
  await expect(pm.onConfirmationPage().confirmationMessagelocator).toHaveText(
    'Your payment was successful. You should receive a follow-up call from our sales team.'
  )
})

