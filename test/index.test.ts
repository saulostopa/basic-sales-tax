import Basket from "../src/Entities/Basket";
import Product from "../src/Entities/Product";
import TaxCalculator from "../src/Services/TaxCalculator";
import BasicSaleTax from "../src/Strategies/Taxes/BasicSaleTax";
import ImportDuty from "../src/Strategies/Taxes/ImportDuty";
import ReceiptManager from "../src/Services/ReceiptManager";

test("Scenario #1", () => {
    let basket = new Basket()
        .add(new Product({ name: 'book', price: 12.49, type: Product.TYPES.BOOK }), 2)
        .add(new Product({ name: 'music CD', price: 14.99, type: Product.TYPES.OTHER }))
        .add(new Product({ name: 'chocolate bar', price: 0.85, type: Product.TYPES.FOOD }));

    let taxCalculator = new TaxCalculator()
        .addTax(new BasicSaleTax())
        .addTax(new ImportDuty());

    let receiptManager = new ReceiptManager(taxCalculator);
    let receipt = receiptManager.create(basket);
    let output = receiptManager.render(receipt);

    expect(output).toEqual([
        '2 book: 24.98',
        '1 music CD: 16.49',
        '1 chocolate bar: 0.85',
        'Sales Taxes: 1.50',
        'Total: 42.32'
    ]);
});

test("Scenario #2", () => {
    let basket = new Basket()
        .add(new Product({ name: 'box of chocolates', price: 10.00, type: Product.TYPES.FOOD, imported: true }))
        .add(new Product({ name: 'bottle of perfume', price: 47.50, type: Product.TYPES.OTHER, imported: true }));

    let taxCalculator = new TaxCalculator()
        .addTax(new BasicSaleTax())
        .addTax(new ImportDuty());

    let receiptManager = new ReceiptManager(taxCalculator);
    let receipt = receiptManager.create(basket);
    let output = receiptManager.render(receipt);

    expect(output).toEqual([
        '1 imported box of chocolates: 10.50',
        '1 imported bottle of perfume: 54.65',
        'Sales Taxes: 7.65',
        'Total: 65.15',
    ]);
});

test("Scenario #3", () => {
    let basket = new Basket()
        .add(new Product({ name: 'bottle of perfume', price: 27.99, type: Product.TYPES.OTHER, imported: true }))
        .add(new Product({ name: 'bottle of perfume', price: 18.99, type: Product.TYPES.OTHER }))
        .add(new Product({ name: 'packet of headache pills', price: 9.75, type: Product.TYPES.MEDICAL }))
        .add(new Product({ name: 'box of chocolates', price: 11.25, type: Product.TYPES.FOOD, imported: true }), 3);

    let taxCalculator = new TaxCalculator()
        .addTax(new BasicSaleTax())
        .addTax(new ImportDuty());

    let receiptManager = new ReceiptManager(taxCalculator);
    let receipt = receiptManager.create(basket);
    let output = receiptManager.render(receipt);

    expect(output).toEqual([
        '1 imported bottle of perfume: 32.19',
        '1 bottle of perfume: 20.89',
        '1 packet of headache pills: 9.75',
        '3 imported box of chocolates: 35.55',
        'Sales Taxes: 7.90',
        'Total: 98.38'
    ]);
});
