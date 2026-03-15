import { Page, Locator } from "@playwright/test"
import { IProduct } from "../interfaces/product";

export class ProductsPage {
    readonly productItemLocator: Locator;
    readonly cartlocator: Locator;
    readonly pageTitleLocator: Locator
    constructor(private readonly page: Page) {
        this.productItemLocator = this.page.locator('.text-center')
        this.cartlocator = this.page.locator('nav button', { hasText: 'Cart' })
        this.pageTitleLocator = this.page.locator('h2')
    }

    async clickCartBtn(): Promise<void> {
        await this.cartlocator.click()
    }

    /**
     * Retrieves all product elements from the page and returns an array of Product objects.
     * Each Product contains the name, price (as a number), and its index in the list.
     */
    async getAllProducts(): Promise<IProduct[]> {
        const items = await this.productItemLocator.all();
        return Promise.all(
            items.map(async (item, i) => ({
                name: await item.locator('p.font-weight-bold').innerText(),
                price: Number(
                    (await item.locator('p', { hasText: 'Price' }).innerText()).replace(/\D/g, '')
                ),
                index: i
            }))
        );
    }

    /**
     * Filters the given array of products, returning only those whose name includes the specified productName substring (case-insensitive).
     * @param products - Array of Product objects to filter
     * @param productName - Substring to search for in product names, 
     * @returns Filtered array of products matching the name criteria
     */
    async filterProductsByName(products: IProduct[], productName: string): Promise<IProduct[]> {
        return products.filter(p =>
            p.name.toLowerCase().includes(productName.toLowerCase())
        );
    }
    /**
     * Finds and returns the product with the lowest price from the given array of products.
     * @param products - Array of Product objects to search through
     * @returns  -The Product object with the lowest price
     */
    async getCheapestProduct(products: IProduct[]): Promise<IProduct> {
        return products.reduce((min, p) =>
            p.price < min.price ? p : min
        );
    }
    // This method combines the functionality of getting all products, filtering them by name, and then finding the cheapest product among the filtered results.
    async getCheapestProductByName(productName: string): Promise<IProduct> {
        const allProducts = await this.getAllProducts()
        const filteredProductsByName = await this.filterProductsByName(allProducts, productName)
        return filteredProductsByName.reduce((min, p) =>
            p.price < min.price ? p : min
        );
    }

    /**
        * Clicks the "Add" button for the product at the specified index in the product list.
        * @param indexOfItem - The index of the product for which to click the "Add" button
    */
    async clickAddBtn(indexOfItem: number) {
        await this.productItemLocator.nth(indexOfItem).locator('button').click()
    }
}