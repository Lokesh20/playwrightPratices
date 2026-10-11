
import {test} from '@playwright/test';
//Using testdata with fixture
// single set can be send not in array
interface TestDataForOrder {
    email: string;
    password: string;
    productName: string;
}

export const customtest = test.extend<{testDataForOrder:TestDataForOrder}>(
    {
        testDataForOrder: {
            email: "lokeshk20892@gmail.com",
            password: "Mahindra@123",
            productName: "ZARA COAT 3"
        }
    }
)