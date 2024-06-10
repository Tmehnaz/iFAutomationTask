const {Builder, Key, By, until} = require('selenium-webdriver');

const chai = import('chai');
const { expect } = chai;

let driver

//describe block

describe('Add item to cart test', async function(){
    
 
    
    it("Login", async function(){

        driver = await new Builder().forBrowser("chrome").build();
        await driver.manage().window().maximize();


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
    
     //declaring the sorting criteria
     

     const sortingOptions = [
        { optionTxt: "Name (A to Z)", expectedOrder: (a, b) => a.localeCompare(b) },
        { optionTxt: "Name (Z to A)", expectedOrder: (a, b) => b.localeCompare(a) },
        { optionTxt: "Price (low to high)", expectedOrder: (a, b) => parseFloat(a.substring(1)) - parseFloat(b.substring(1)) },
        { optionTxt: "Price (high to low)", expectedOrder: (a, b) => parseFloat(b.substring(1)) - parseFloat(a.substring(1)) }
    ];

    
    for (let { optionTxt, expectedOrder } of sortingOptions) {            //retrieving the sorting options
        it(`${optionTxt} sorting`, async function () {
            await driver.get("https://www.saucedemo.com/inventory.html");

            
            let productElements = await driver.findElements(By.className("inventory_item_name"));   // default sorting settings
            let originalItems = await Promise.all(productElements.map(async (element) => await element.getText()));

            // Sorting according 4 criteria dynamically
            await driver.findElement(By.className("product_sort_container")).click();
            await driver.findElement(By.xpath(`//option[contains(text(),'${optionTxt}')]`)).click();

            // storing the sorted items
            let sortedElements = await driver.findElements(By.className("inventory_item_name"));
            let sortedItems = await Promise.all(sortedElements.map(async (element) => await element.getText()));

            // Verification of the sorted list
            let expectedSortedItems = originalItems.slice().sort(expectedOrder);
            expect(sortedItems).to.deep.equal(expectedSortedItems);
            
        });
    }
    await driver.quit();
 });
