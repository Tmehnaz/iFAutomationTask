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

        await driver.findElement(By.id("user-name")).sendKeys("locked_out_user", Key.RETURN);
        await driver.findElement(By.id("password")).sendKeys("secret_sauce",Key.RETURN);
        await driver.findElement(By.id("login-button")).click();
        
        
        let element = await driver.wait(until.elementLocated(By.className("error-button")), 10000)

        let elementTxt = await element.getText();
        let errorMsg = await elementTxt.isDisplayed();
        expect(errorMsg).to.be.true;

        
          
    });
    await driver.quit();
});