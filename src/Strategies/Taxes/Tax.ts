import Product from "../../Entities/Product";

export default interface Tax {
    // calculate tax for product
    calculate(product: Product): number;
}