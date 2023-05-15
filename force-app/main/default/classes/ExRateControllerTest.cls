@isTest
private class ExRateControllerTest {
  @isTest
  static void testGetUSDExchangeRate() {
    ExRate__c exchangeRate = ExRateDataFactory.createExRate();

    ExRate__c result = ExRateController.getUSDExchangeRate();

    System.assertEquals(
      exchangeRate.Exchange_Rate__c,
      result.Exchange_Rate__c,
      'Incorrect exchange rate'
    );
    System.assertEquals(
      exchangeRate.Date_of_the_exchange_rate__c,
      result.Date_of_the_exchange_rate__c,
      'Incorrect date of exchange rate'
    );
  }
}
