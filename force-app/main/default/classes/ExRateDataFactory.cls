public with sharing class ExRateDataFactory {
  public static ExRate__c createExRate() {
    ExRate__c exchangeRate = new ExRate__c(
      Name = 'USD',
      Exchange_Rate__c = 2.0,
      Date_of_the_exchange_rate__c = Date.today()
    );
    insert exchangeRate;
    return exchangeRate;
  }
}
