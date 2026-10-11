Feature: Test Validation 
## Scearnio can be run parallel not the feature file in cucumber.

@Validation
@ErrorValidaton
  Scenario Outline: Scenario Outline name: Check Error Message
    Given a login to ecommerce2 application with "<Username>" and "<Password>"
    Then Error message is dispalyed

    Examples: 
    |Username               |Password|
    |lokeshk20892@gmail.com1|Mahindra@123|
    |lokeshk20892@gmail.com2|Mahindra@123|
    |lokeshk20892@gmail.com3|Mahindra@123|
  
@Validation
@Regression
  Scenario: Placing the order
    Given a login to ecommerce application with "lokeshk20892@gmail.com" and "Mahindra@123"
    When Add "ZARA COAT 3" to cart
    Then verify "ZARA COAT 3" is displayed in the cart
    When Enter valid details and the place the order
    Then Verify order in present in the orderhistory
