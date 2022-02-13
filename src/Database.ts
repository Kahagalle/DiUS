export const catalogue: Array<any> = [
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
]

export const definedRules: Array<any> = [
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
]