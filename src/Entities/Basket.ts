import BasketItem from "./BasketItem";
import Product from "./Product";

export default class Basket {
    // list of items in the basket
    private items: BasketItem[] = [];

    // add quantity product in the basket
    add (product: Product, quantity: number = 1): this {
        this.items.push(new BasketItem(product, quantity));
        return this;
    }

    // return all items in the basket
    all (): BasketItem[] {
        return this.items;
    }
}
