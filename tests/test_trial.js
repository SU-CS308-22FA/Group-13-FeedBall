const {By,Key,Builder} = require("selenium-webdriver");
require("chromedriver");


async function example_leaderboard_testing(){

  //To wait for browser to build and launch properly
  let driver = await new Builder().forBrowser("chrome").build();

   //To fetch http://google.com from the browser with our code.
    await driver.get("https://group-13-feed-ball.vercel.app/");

   //Verify the page title and print it
    var title = await driver.getTitle();
    console.log(title);

    try{
      let emailInputBox = await driver.findElement(By.name("emailInput"));
      let passwordInputBox = await driver.findElement(By.name("passwordInput"));

      emailInputBox.click();
      emailInputBox.sendKeys("bilgesucakir@gmail.com");


      passwordInputBox.click();
      passwordInputBox.sendKeys("123456");




    }
    catch{
      console.log("couldnt login");
    }



   //It is always a safe practice to quit the browser after execution

    await driver.quit();

}


example_leaderboard_testing();
