let webdriver = require('selenium-webdriver');
let By = webdriver.By;
let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
driver.get('http://www.baidu.com');

kw_input = driver.findElement(By.id("kw")).sendKeys("csdn itmeng");
su_button = driver.findElement(By.id("su")).click();
