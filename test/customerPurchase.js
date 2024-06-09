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
        // await StylePropertyMap

        
        await driver.findElement(By.id("login-button")).click();
        

        // Verify successful login

        let element = await driver.wait(until.elementLocated(By.xpath("//*[@id='header_container']/div[1]/div[2]/div")), 10000)

        let actualTxt = await element.getText();
        let expectedTxt = "Swag Labs";
        expect(actualTxt).to.equal(expectedTxt);    
        
    });
    
    // Add multiple item to the shopping cart
    
    it("Add product", async function(){
        let prodCount = 3;

        await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click();
        await driver.findElement(By.id("add-to-cart-sauce-labs-bike-light")).click();
        await driver.findElement(By.id("add-to-cart-sauce-labs-bolt-t-shirt")).click();

        let  cartIcon = await driver.findElement(By.className("shopping_cart_link"));
        let cartTxt = await cartIcon.getText();
        let cartNotificationCount = parseInt(cartTxt);
        expect(cartNotificationCount).to.equal(prodCount);

    });

    //Proceed to Checkout

     it("Proceed to Checkout", async function(){

        await driver.findElement(By.className("shopping_cart_link")).click();
        await driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");
        await driver.findElement(By.id("checkout")).click();

        //CheckOut Info

        await driver.findElement(By.id("first-name")).sendKeys("John", Key.RETURN);
        await driver.findElement(By.id("last-name")).sendKeys("Doe", Key.RETURN);
        await driver.findElement(By.id("postal-code")).sendKeys("15140", Key.RETURN);
        await driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");
        await  driver.findElement(By.id("continue")).click();

        //checkout overview  
        await driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");   
        await driver.sleep(5000);
        await  driver.findElement(By.id("finish")).click();   
        
        let msg = await driver.wait(until.elementsLocated(By.xpath("//*[@id='checkout_complete_container']/h2")));
        let successfulMsg = await msg.getText();
         let expectedMsg = "Thank you for your order!";

         expect(successfulMsg).to.equal(expectedMsg);


     })

 });




