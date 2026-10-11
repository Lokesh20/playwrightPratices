
import { test,expect, Locator, Page } from '@playwright/test';


import {customtest} from '../testdata/Testdatafixture_ts';
import { LoginPage } from '../pageobject ts/LoginPage';
import { DashboardPage } from '../pageobject ts/DashboardPage';
import { CartPage } from '../pageobject ts/CartPage';
import {CheckOutPage} from '../pageobject ts/CheckOutPage'
import {ConformationPage} from '../pageobject ts/ConformationPage';
import {OrdersPage} from '../pageobject ts/OrdersPage';

import { PageManager } from '../pageobject ts/PageManager';
import testData from '../testdata/ecomtestdata.json';
const data = testData;



test("Test with POManager", async ({ page }) => {


    const email = "lokeshk20892@gmail.com";
    const password = "Mahindra@123";
    const productName = 'ZARA COAT 3';
    //await page.pause();
    const pageManager= new PageManager(page);
    const loginpage = pageManager.LoginPage();
    await loginpage.gotourl();
    await loginpage.validlogin(data.email, data.password);
    const dashboardpage = pageManager.DashBoard();
    // await page.pause();
    await dashboardpage.searchproduct(data.productName);
    await dashboardpage.navigateToCart();

    const cartpage = pageManager.CartPage()
    //await page.pause();
    await cartpage.validateProduct(data.productName)
    await cartpage.navigateToCheckout();


    const checkout = pageManager.CheckoutPage();
    await checkout.selectCountry("ind", " India")
    await checkout.cardnumber("4542 9931 9292 2293");
    await checkout.expirydate("07", "22");
    await checkout.cvvcode("1234");
    await checkout.name("Lokesh koli");
    await checkout.couponValidation("RahulShetty20", "* Invalid Coupon");
    await checkout.placeOrder();

    const thankyou = pageManager.ConformattionPage();
    await thankyou.validatemessage("Thankyou")
    const orderNo = await thankyou.orderno();
    await thankyou.validateproductname(data.productName);
    await thankyou.navigateToOrders();
    let orderspage:any = pageManager.OrdersPage();
    await orderspage.viewbutton(orderNo);
    await orderspage.validateordernumber(orderNo)

});

customtest("End to End testdata from extends fixture", async ({ page, testDataForOrder }) => {

    //await page.pause();
    const loginpage = new LoginPage(page);
    await loginpage.gotourl();
    await loginpage.validlogin(testDataForOrder.email, testDataForOrder.password);
    const dashboardpage = new DashboardPage(page);
    // await page.pause();
    await dashboardpage.searchproduct(testDataForOrder.productName);
    await dashboardpage.navigateToCart();

    const cartpage = new CartPage(page)
    //await page.pause();
    await cartpage.validateProduct(testDataForOrder.productName)
    await cartpage.navigateToCheckout();


    const checkout = new CheckOutPage(page);
    await checkout.selectCountry("ind", " India")
    await checkout.cardnumber("4542 9931 9292 2293");
    await checkout.expirydate("07", "22");
    await checkout.cvvcode("1234");
    await checkout.name("Lokesh koli");
    await checkout.couponValidation("RahulShetty20", "* Invalid Coupon");
    await checkout.placeOrder();

    const thankyou = new ConformationPage(page);
    await thankyou.validatemessage("Thankyou")
    const orderNo = await thankyou.orderno();
    await thankyou.validateproductname(testDataForOrder.productName);
    await thankyou.navigateToOrders();
    let orderspage:any = new OrdersPage(page);
    await orderspage.viewbutton(orderNo);
    await orderspage.validateordernumber(orderNo)

});