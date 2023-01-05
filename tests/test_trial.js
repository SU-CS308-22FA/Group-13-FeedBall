const {By,Key,Builder} = require("selenium-webdriver");
require("chromedriver");


async function example(){

  var searchString = "Automation testing with Selenium and JavaScript";

  //To wait for browser to build and launch properly
  let driver = await new Builder().forBrowser("chrome").build();

   //To fetch http://google.com from the browser with our code.
    await driver.get("https://group-13-feed-ball.vercel.app/feed");

   //Verify the page title and print it
    var title = await driver.getTitle();

    if(title != null && title.length > 0){
      console.log('Title is:',title);
    }
    else{
      console.log("title is empty");
    }

    let submitButton = await driver.findElement(By.name("leaderboardbutton"));

      await submitButton.click();

      var currentLink = driver.getPageSource();

      console.log(currentLink);

      /*
      let message = await driver.findElement(By.id('message'));
      let value = await message.getText();
      assert.equal("Received!", value);*/


      /*
      var title_leaderboard = await driver.findElement(By.className("mainfeedtext"));

      console.log(title_leaderboard);*/




   //It is always a safe practice to quit the browser after execution
   await driver.quit();

}


example();
