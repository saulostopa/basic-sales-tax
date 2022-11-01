import Product from "./Product";

export default class BasketItem {
    // reference of the product item
    private product: Product;

    // quantity of the product
    private quantity: number;

    constructor (product: Product, quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }

    // get item product
    getProduct (): Product {
        return this.product;
    }

    // get quantity product
    getQuantity (): number {
        return this.quantity;
    }
}
