public with sharing class ExRateController {
  @AuraEnabled(cacheable=true)
  public static ExRate__c getUSDExchangeRate() {
    return ExRateManager.getExRateByName('USD');
  }
}
