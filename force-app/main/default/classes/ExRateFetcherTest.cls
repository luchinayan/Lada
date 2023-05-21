@isTest
private class ExRateFetcherTest {
  @isTest
  static void testUpdateExchangeRate() {
    String mockResponse = '{"Cur_Abbreviation": "USD","Cur_OfficialRate": 2.0}';
    Test.setMock(
      HttpCalloutMock.class,
      new MockHttpResponse('200', mockResponse)
    );

    Test.startTest();
    ExchangeRateUpdater.updateExchangeRate();
    Test.stopTest();

    ExRate__c updatedExchangeRateRecord = [
      SELECT Id, Name, Exchange_Rate__c, Date_of_the_exchange_rate__c
      FROM ExRate__c
      WHERE Name = 'USD'
    ];

    System.assertEquals(
      'USD',
      updatedExchangeRateRecord.Name,
      'Incorrect currency abbreviation'
    );
    System.assertEquals(
      2.0,
      updatedExchangeRateRecord.Exchange_Rate__c,
      'Incorrect exchange rate'
    );
    System.assertEquals(
      Date.today(),
      updatedExchangeRateRecord.Date_of_the_exchange_rate__c,
      'Incorrect date of exchange rate'
    );
  }
}
