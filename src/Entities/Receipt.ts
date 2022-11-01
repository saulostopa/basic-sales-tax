import Product from "./Product";

interface ReceiptParams {
    product: Product,
    tax: number,
    quantity: number,
    totalPrice?: number
}

export default class Receipt {
    // entries of receipt
    private entries: ReceiptParams[] = [];

    // add entry to receipt
    addEntry (entry: ReceiptParams): this {
        entry.totalPrice = this.calculateTotalPrice(entry);
        this.entries.push(entry);
        return this;
    }

    // total calculation of price
    private calculateTotalPrice (entry: ReceiptParams): number {
        return (entry.product.getPrice() + entry.tax) * entry.quantity;
    }

    // get all entries of receipt
    getEntries (): ReceiptParams[] {
        return this.entries;
    }
}
