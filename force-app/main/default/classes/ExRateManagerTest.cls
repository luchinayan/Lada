@isTest
private class ExRateManagerTest {
  @isTest
  static void testGetExRateByName() {
    ExRate__c exchangeRate = ExRateDataFactory.createExRate();

    List<ExRate__c> result = ExRateManager.getExRateByName('USD');

    System.assertEquals(exchangeRate.Id, result[0].Id, 'Incorrect record Id');
    System.assertEquals(
      exchangeRate.Exchange_Rate__c,
      result[0].Exchange_Rate__c,
      'Incorrect exchange rate'
    );
    System.assertEquals(
      exchangeRate.Date_of_the_exchange_rate__c,
      result[0].Date_of_the_exchange_rate__c,
      'Incorrect date of exchange rate'
    );
  }
}
