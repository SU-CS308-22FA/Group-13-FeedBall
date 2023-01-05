

from selenium import webdriver
from selenium.webdriver.common.by import By
from io import StringIO
from PIL import Image

options = webdriver.ChromeOptions()
    #run Selenium in headless mode
options.add_argument('--headless')
options.add_argument('--no-sandbox')
#overcome limited resource problems
options.add_argument('--disable-dev-shm-usage')
options.add_argument("lang=en")
#open Browser in maximized mode
options.add_argument("start-maximized")
#disable infobars


options.add_argument("--disable-blink-features=AutomationControlled")
driver = webdriver.Chrome(options=options)
driver.capabilities['loggingPrefs'] = {'browser': 'ALL'}
logs = driver.capabilities
driver.get('https://group-13-feed-ball.vercel.app/feed')

title = driver.title
print(str(title))

email = driver.find_element(By.NAME, 'emailInput')
password = driver.find_element(By.NAME, 'passwordInput')

email.send_keys('bilgesucakir@gmail.com')
driver.save_screenshot('sample_screenshot_c.png')
password.send_keys('123456')
driver.save_screenshot('sample_screenshot_d.png')

loginButton = driver.find_element(By.NAME,'loginPage')
loginButton.click()


menuButton = driver.find_element(By.NAME, "menuButton")
menuButton.click()
leaderboardButton = driver.find_element(By.NAME, "profilePageButton")
leaderboardButton.click()

editButton = driver.find_element(By.CLASS_NAME, "editButton")
editButton.click()

nameInput = driver.find_element(By.NAME, "nameInput")
surnameInput = driver.find_element(By.NAME, "surnameInput")

nameInput.click()
nameInput.send_keys("Bilgesu-nameedited")
surnameInput.send_keys("Çakır-nameedited")

submitButton = driver.find_element(By.CLASS_NAME, "editbutton")
submitButton.click()

driver.save_screenshot('sample_screenshot_d.png')
