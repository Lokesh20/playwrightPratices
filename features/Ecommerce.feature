Feature: Test suite Ecommerce Flow Validation

  @Regression
  Scenario: Placing the order
    Given a login to ecommerce application with "lokeshk20892@gmail.com" and "Mahindra@123"
    When Add "ZARA COAT 3" to cart
    Then verify "ZARA COAT 3" is displayed in the cart
    When Enter valid details and the place the order
    Then Verify order in present in the orderhistory
