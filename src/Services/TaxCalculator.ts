import Tax from "../Strategies/Taxes/Tax";
import Product from "../Entities/Product";

export default class TaxCalculator {
    // list of taxes
    private taxesList: Tax[] = [];

    // add tax to list products
    addTax (tax: Tax): this {
        this.taxesList.push(tax);
        return this;
    }

    // calculate tax for product
    calculate (product: Product): number {
        return this.taxesList.reduce((totalAmount: number, tax: Tax) => {
            return totalAmount + tax.calculate(product);
        }, 0);
    }
}
