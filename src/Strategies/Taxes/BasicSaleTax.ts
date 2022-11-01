import Tax from "./Tax";
import Product from "../../Entities/Product";
import { roundUp } from "../../Helper/roundUp";

export default class BasicSaleTax implements Tax {
    // types that are excluded from basic sale tax
    static excludedTypes = [
        Product.TYPES.BOOK,
        Product.TYPES.FOOD,
        Product.TYPES.MEDICAL,
    ];

    calculate (product: Product): number {
        if (BasicSaleTax.excludedTypes.indexOf(product.getType()) !== -1) {
            return 0.0;
        }

        return roundUp(product.getPrice() * 0.10, 0.05);
    }
}