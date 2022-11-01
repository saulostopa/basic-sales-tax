enum Type {
    OTHER,
    BOOK,
    FOOD,
    MEDICAL
}

interface ProductParameters {
    name: string,
    price: number,
    type?: Type,
    imported?: boolean
}

export default class Product {
    /**
     * The allowed types for a product.
     */
    static TYPES = Type;

    /**
     * The name of the product.
     */
    private name: string;

    /**
     * The original price of the product.
     */
    private price: number;

    /**
     * The type of the product.
     */
    private type: Type;

    /**
     * True if the product is imported.
     */
    private imported: boolean;

    constructor ({name, price, type, imported}: ProductParameters) {
        this.name = name;
        this.price = price;
        this.type = type || Product.TYPES.OTHER;
        this.imported = imported || false;
    }

    getName (): string {
        return this.name;
    }

    getPrice (): number {
        return this.price;
    }

    getType (): Type {
        return this.type;
    }

    isImported(): boolean {
        return this.imported;
    }
}
