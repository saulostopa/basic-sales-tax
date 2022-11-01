import Tax from "./Tax";
import Product from "../../Entities/Product";
import { roundUp } from "../../Helper/roundUp";

export default class ImportDuty implements Tax {
    
    calculate (product: Product): number {
        if (product.isImported()) {
            return roundUp(product.getPrice() * 0.05, 0.05);
        }

        return 0;
    }
}