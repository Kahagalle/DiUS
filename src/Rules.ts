import {catalogue, definedRules} from "./Database";

export class Rules {

    private total: number;

    constructor(scannedSKUs: Array<string>, total: number) {
        this.total = total;

        for (let rule of definedRules) {
            switch(rule.type) {
                case "freeProducts":
                    this.freeProducts(scannedSKUs, rule.sku, rule.buyAmount, rule.freeAmount);
                    break; 
                case "bulkDiscount":
                    this.bulkDiscount(scannedSKUs, rule.sku, rule.minAmountForDiscount, rule.discount);
                    break; 
                case "bundleProducts":
                    this.bundleProducts(scannedSKUs, rule.buySku, rule.buyAmount, rule.freeSku, rule.freeAmount);
                    break; 
            }
        }        
    }

    /**
     * Buy 'buyAmount' number of products and get 'freeAmount' number of products free
     * @param {Array<string>} products
     * @param {string} sku
     * @param {number} buyAmount
     * @param {number} freeAmount
     */
    private freeProducts(products: Array<string>, sku: string, buyAmount: number, freeAmount: number): void {
        let catalogueProduct = catalogue.find(item => item.sku === sku),
            numOfProducts = products.filter(product => product === sku).length,
            freeProducts = Math.floor(numOfProducts/buyAmount);
        
        if (freeProducts && catalogueProduct) {
            this.total -= (freeProducts * freeAmount) * catalogueProduct.price;
        }
    }

    /**
     * Buy 'minAmountForDiscount' number of products and drop the price for each item by 'discount' amount
     * @param {Array<string>} products
     * @param {string} sku
     * @param {number} minAmountForDiscount
     * @param {number} discount
     */
    private bulkDiscount(products: Array<string>, sku: string, minAmountForDiscount: number, discount: number): void {
        let numOfProducts = products.filter(product => product === sku).length;
        
        if (numOfProducts >  minAmountForDiscount) {
            this.total -= numOfProducts * discount;
        }
    }

    /**
     * Buy 'buySku' items 'buyAmount' times and get free 'freeAmount' number of 'freeSku' items
     * @param {Array<string>} products
     * @param {string} buySku
     * @param {number} buyAmount
     * @param {string} freeSku
     * @param {number} freeAmount
     */
    private bundleProducts(products: Array<string>, buySku: string, buyAmount: number, freeSku: string, freeAmount: number): void {
        let catalogueFreeProduct = catalogue.find(item => item.sku === freeSku),
            numOfBuyProducts = Math.floor(products.filter(product => product === buySku).length / buyAmount),
            numOfFreeProducts = Math.floor(products.filter(product => product === freeSku).length / freeAmount);

        if (numOfBuyProducts && numOfFreeProducts) {
            this.total -= ((numOfBuyProducts >= numOfFreeProducts) ? numOfFreeProducts : numOfBuyProducts) * catalogueFreeProduct.price;
        }
    }

    /**
     * Return total amount after discounts
     */
    public getTotal(): any {
        return this.total;
    }
}
