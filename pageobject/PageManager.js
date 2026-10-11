const { expect } = require('@playwright/test');
const { LoginPage } = require('../pageobject/LoginPage');
const { DashboardPage } = require('../pageobject/DashboardPage');
const { CartPage } = require('../pageobject/CartPage');
const { CheckOutPage } = require('../pageobject/CheckOutPage');
const { ConformationPage } = require('../pageobject/ConformationPage');
const { OrdersPage } = require('../pageobject/OrdersPage');

class PageManager {
    constructor(page) {
        this.page = page;
    }

    LoginPage() {
        return new LoginPage(this.page);
    }


    DashBoard() {
        return new DashboardPage(this.page);
    }

    CartPage() {
        return new CartPage(this.page);
    }

    CheckoutPage() {
        return new CheckOutPage(this.page);
    }

    ConformattionPage() {
        return new ConformationPage(this.page);
    }

    OrdersPage() {
        return new OrdersPage(this.page);
    }




}

module.exports = {
    PageManager





}