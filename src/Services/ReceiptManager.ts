import TaxCalculator from "./TaxCalculator";
import Basket from "../Entities/Basket";
import Receipt from "../Entities/Receipt";
import BasketItem from "../Entities/BasketItem";
import { roundUp } from "../Helper/roundUp";

export default class ReceiptManager {
    // tax calculator
    private taxCalculator: TaxCalculator

    constructor (taxCalculator: TaxCalculator) {
        this.taxCalculator = taxCalculator;
    }

    // create receipt from basket
    create (basket: Basket): Receipt {
        return basket
            .all()
            .reduce((receipt: Receipt, item: BasketItem) => {
                let product = item.getProduct();
                let tax = this.taxCalculator.calculate(product);
                let quantity = item.getQuantity();
                return receipt.addEntry({product, tax, quantity});
            }, new Receipt());
    }

    // print receipt
    render (receipt: Receipt): Array<string> {
        let result = [];
        let taxSum = 0;
        let priceSum = 0;
        receipt
            .getEntries()
            .forEach((entry) => {
                result.push(
                    entry.quantity + ' ' +
                    (entry.product.isImported() ? 'imported ' : '') + 
                    entry.product.getName() + ': ' +
                    entry.totalPrice.toFixed(2)
                );
                taxSum += entry.tax * entry.quantity;
                priceSum += entry.totalPrice;
            });
        result.push('Sales Taxes: ' + roundUp(taxSum).toFixed(2));
        result.push('Total: ' + roundUp(priceSum).toFixed(2));

        return result;
    }
}