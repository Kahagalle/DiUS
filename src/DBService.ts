export class DBService {

    private catalogue: Array<any>;
    private definedRules: Array<any>;

    constructor() {
        this.catalogue = [
            {
                sku: "ipd",
                name: "Super iPad",
                price: 549.99
            },
            {
                sku: "mbp",
                name: "MacBook Pro",
                price: 1399.99
            },
            {
                sku: "atv",
                name: "Apple TV",
                price: 109.50
            },
            {
                sku: "vga",
                name: "VGA adapter",
                price: 30.00
            }
        ];

        this.definedRules = [
            {
                type: "freeProducts",
                sku: "atv",
                buyAmount: 2,
                freeAmount: 1
            },
            {
                type: "bulkDiscount",
                sku: "ipd",
                minAmountForDiscount: 4,
                discount: 50
            },
            {
                type: "bundleProducts",
                buySku: "mbp",
                buyAmount: 1,
                freeSku: "vga",
                freeAmount: 1
            }
        ];
    }

    /**
     * Return catalogue
     */
    public getCatalogue(): Array<any> {
        // TODO: Fetch catalogue from db and return
        return this.catalogue;
    }

    /**
     * Return defined rules
     */
    public getDefinedRules(): Array<any> {
        // TODO: Fetch definedRules from db and return
        return this.definedRules;
    }
}
