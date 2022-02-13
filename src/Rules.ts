import {DBService} from "./DBService";

export class Rules {

    private total: number;
    private catalogue: Array<any>;
    private definedRules: Array<any>;

    constructor(scannedSKUs: Array<string>, total: number) {
        this.total = total;
        
        let dbService = new DBService();
        this.definedRules = dbService.getDefinedRules();
        this.catalogue = dbService.getCatalogue();

        for (let rule of this.definedRules) {
            switch(rule.type) {
                case "freeProducts":
                    this.freeProducts(scannedSKUs, rule);
                    break; 
                case "bulkDiscount":
                    this.bulkDiscount(scannedSKUs, rule);
                    break; 
                case "bundleProducts":
                    this.bundleProducts(scannedSKUs, rule);
                    break; 
            }
        }        
    }

    /**
     * Buy 'buyAmount' number of products and get 'freeAmount' number of products free
     * @param {Array<string>} products
     * @param {any} rule
     */
    private freeProducts(products: Array<string>, rule: any): void {
        let catalogueProduct = this.catalogue.find(item => item.sku === rule.sku),
            numOfProducts = products.filter(product => product === rule.sku).length,
            freeProducts = Math.floor(numOfProducts/rule.buyAmount);
        
        if (freeProducts && catalogueProduct) {
            this.total -= (freeProducts * rule.freeAmount) * catalogueProduct.price;
        }
    }

    /**
     * Buy 'minAmountForDiscount' number of products and drop the price for each item by 'discount' amount
     * @param {Array<string>} products
     * @param {any} rule
     */
    private bulkDiscount(products: Array<string>, rule: any): void {
        let numOfProducts = products.filter(product => product === rule.sku).length;
        
        if (numOfProducts > rule.minAmountForDiscount) {
            this.total -= numOfProducts * rule.discount;
        }
    }

    /**
     * Buy 'buySku' items 'buyAmount' times and get free 'freeAmount' number of 'freeSku' items
     * @param {Array<string>} products
     * @param {any} rule
     */
    private bundleProducts(products: Array<string>, rule: any): void {
        let catalogueFreeProduct = this.catalogue.find(item => item.sku === rule.freeSku),
            numOfBuyProducts = Math.floor(products.filter(product => product === rule.buySku).length / rule.buyAmount),
            numOfFreeProducts = Math.floor(products.filter(product => product === rule.freeSku).length / rule.freeAmount);

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
