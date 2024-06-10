const {Builder, Key, By, until} = require('selenium-webdriver');

const chai = import('chai');
const { expect } = chai;

let driver

//describe block

describe('Add item to cart test', async function(){
    
 
    
    it("Login", async function(){

        driver = await new Builder().forBrowser("chrome").build();

        await driver.get("https://www.saucedemo.com/checkout-complete.html");

        await driver.findElement(By.id("user-name")).sendKeys("standard_user", Key.RETURN);
        await driver.findElement(By.id("password")).sendKeys("secret_sauce",Key.RETURN);
        await driver.findElement(By.id("login-button")).click();
        

        // Verify successful login

        let element = await driver.wait(until.elementsLocated(By.xpath("//*[@id='header_container']/div[1]/div[2]/div")), 10000)

        let actualTxt = await element.getText();
        let expectedTxt = "Swag Labs";
        expect(actualTxt).to.equal(expectedTxt);    
        
    });
    
     //Sort Items
     

     const sortingOptions = [
        { optionTxt: "Name (A to Z)", expectedOrder: (a, b) => a.localeCompare(b) },
        { optionTxt: "Name (Z to A)", expectedOrder: (a, b) => b.localeCompare(a) },
        { optionTxt: "Price (low to high)", expectedOrder: (a, b) => parseFloat(a.substring(1)) - parseFloat(b.substring(1)) },
        { optionTxt: "Price (high to low)", expectedOrder: (a, b) => parseFloat(b.substring(1)) - parseFloat(a.substring(1)) }
    ];

    // Sorting tests
    for (let { optionTxt, expectedOrder } of sortingOptions) {
        it(`${optionTxt} sorting`, async function () {
            await driver.get("https://www.saucedemo.com/inventory.html");

            // Capture original list before sorting
            let productElements = await driver.findElements(By.className("inventory_item_name"));
            let originalItems = await Promise.all(productElements.map(async (element) => await element.getText()));

            // Perform sorting action
            await driver.findElement(By.className("product_sort_container")).click();
            await driver.findElement(By.xpath(`//option[contains(text(),'${optionTxt}')]`)).click();

            // Capture the sorted list
            let sortedElements = await driver.findElements(By.className("inventory_item_name"));
            let sortedItems = await Promise.all(sortedElements.map(async (element) => await element.getText()));

            // Verify sorting order
            let expectedSortedItems = originalItems.slice().sort(expectedOrder);
            expect(sortedItems).to.deep.equal(expectedSortedItems);
            
        });
    }
    await driver.quit();
 });
