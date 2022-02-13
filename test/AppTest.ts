import assert from  "assert";
import calculateTotal from "../src/App";


describe ("SingleRule", () => {

    describe ("FreeProductsRule", () => {
        it ("should remove free items from the total", () => {
            let result = calculateTotal(["atv", "atv", "atv", "vga"]);
            assert.equal(result, 249);
        });
    });

    describe ("BulkDiscountRule", () => {
        it ("should remove discounted prices from all the items", () => {
            let result = calculateTotal(["ipd", "ipd", "ipd", "ipd", "ipd", "mbp"]);
            assert.equal(result, 3899.94);
        });
    });

    describe ("BundleProductsRule", () => {
        it ("should remove bundled product prices from the total", () => {
            let result = calculateTotal(["mbp", "mbp", "vga", "vga", "vga"]);
            assert.equal(result, 2829.98);
        });
    });
});

describe ("MultipleRules", () => {

    it ("should apply free products discount and bulk discount", () => {
        let result = calculateTotal(["atv", "ipd", "ipd", "atv", "ipd", "ipd", "ipd", "atv"]);
        assert.equal(result, 2718.95);
    });

    it ("should apply free products discount and bundle product discount", () => {
        let result = calculateTotal(["mbp", "vga", "atv", "atv", "atv"]);
        assert.equal(result, 1618.99);
    });
});

