import {Rules} from "./Rules"
import {catalogue} from "./Database";

function calculateTotal(scannedSKUs: Array<string>): number {
    let total = 0;
    for (let sku of scannedSKUs) {
        let product = catalogue.find(item => item.sku === sku);
        if (product) {
            total += product.price;
        }
    }
    total = applyDiscount(scannedSKUs, total);
    return Math.round(total * 100) / 100;
}

function applyDiscount(scannedSKUs: Array<string>, total: number): number {
    try {
        let rules = new Rules(scannedSKUs, total);
        return rules.getTotal();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default calculateTotal;
