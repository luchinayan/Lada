public with sharing class ExRateHelper {
  @AuraEnabled(cacheable=true)
  public static List<ExRate__c> getExchangeRate() {
    return [
      SELECT Exchange_Rate__c
      FROM ExRate__c
      LIMIT 1
    ];
  }
}
