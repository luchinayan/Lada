public with sharing class ExRateManager {
  public static ExRate__c getExRateByName(String name) {
    return [
      SELECT Id, Exchange_Rate__c, Date_of_the_exchange_rate__c
      FROM ExRate__c
      WHERE Name = :name
    ];
  }
}
