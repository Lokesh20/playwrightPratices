const { test } = require('@playwright/test');
//Using testdata with fixture
// single set can be send not in array

exports.customtest = test.extend(
    {
        testDataForOrder: {
            email: "lokeshk20892@gmail.com",
            password: "Mahindra@123",
            productName: "ZARA COAT 3"
        }
    }
)