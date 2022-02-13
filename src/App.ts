import {Rules} from "./Rules"
import {DBService} from "./DBService";

function calculateTotal(scannedSKUs: Array<string>): number {
    let total = 0,
        dbService = new DBService(),
        catalogue = dbService.getCatalogue();
    
    for (let sku of scannedSKUs) {
        let product = catalogue.find(item => item.sku === sku);
        if (product) {
            total += product.price;
        }
    }

    return applyDiscount(scannedSKUs, total);
}

function applyDiscount(scannedSKUs: Array<string>, total: number): number {
    try {
        let rules = new Rules(scannedSKUs, total);
        return Math.round(rules.getTotal() * 100) / 100;
    } catch (error) {
        console.log("Rules error: ", error);
        throw error;
    }
}

export default calculateTotal;
