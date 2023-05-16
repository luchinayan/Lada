public with sharing class ExRateController {
  @AuraEnabled(cacheable=true)
  public static List<ExRate__c> getUSDExchangeRate() {
    return ExRateManager.getExRateByName('USD');
  }
}
