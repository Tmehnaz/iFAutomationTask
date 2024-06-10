#  Swag Labs Test Automation 

In this demo project I have used Selenium webdriver for Node.js environment to automate the given scenarios(3) of the following demo e-commerce site "https://www.saucedemo.com/". Each version of one scenario has been tested for the chrome browser only and windows platform. Three test cases come in a sequential manner.  


## Introduction

Mocha framework has been used for this project and to generate report both in raw and json formate, mochawesome
has been implemented. To keep the project simple and precise for the demo, only the happy path of the scenarios are being added which basically shows how the ideal steps should direct the users to achieve the goal of each task. But the code structure is curated in such a way that we can reuse them and modify them according to the future need of the testing scenario. The purpose of this automation testing is to make a seamless experience for the users, lesser feedback loop while managing the menial task with reuseable automated test suits.  

Test Scenario 1 - Add product to the cart:
1. Login
2. Add product tot eh cart with validation
3. Proceed tot eh checkout option which includes validation
4. Overviewing the order
5. Lastly successful message for the purchase has been valoidated.

Test Scenario 2 - Sort:
1. Logged in user.
2. Navigate tot he sort option
3. makign changes and vross checking them accordingly

Test Scenario 3: Locked-out user:
1. Capuring the error message for locked-out user
    


## Installation

2. Node.js and npm should be installed on your machine.

## Clone the Repositor

``bash

git clone https://github.com/Tmehnaz/iFAutomationTask.git
cd your-repo

Dependencies:

npm install

npm i mocha(framework to use assertion libreries)

npm i mochawesome(to generate repost)
 

## Guideline to run the project

``bash 
npm test 


## Contribution

the major part of this demo project was done from my prior experience working as a SQA Engineer. I tried my best to reflect on
the instructions given which focused on the clean code, concise and resuasble code strategy with some run time bugs. But the 
webdriver works perfectly fine where anyone intsalling the project can see the navigation of test suit running and completing 
the task of automation where it only follows the positive scenrios. The code structure follows a standard which can extended 
for further automation with proper dependencies and installation.   


