
import { expect, Locator, Page } from '@playwright/test';
import { LoginPage } from '../pageobject ts/LoginPage';
import { DashboardPage } from '../pageobject ts/DashboardPage';
import { CartPage } from '../pageobject ts/CartPage';
import {CheckOutPage} from '../pageobject ts/CheckOutPage'
import {ConformationPage} from '../pageobject ts/ConformationPage';
import {OrdersPage} from '../pageobject ts/OrdersPage';


export class PageManager {
    page:Page
    constructor(page:Page) {
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