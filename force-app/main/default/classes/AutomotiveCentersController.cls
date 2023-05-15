public class AutomotiveCentersController {
  @AuraEnabled(cacheable=true)
  public static List<Automotive_Center__c> getAllAutomotiveCenters() {
    return AutomotiveCentersManager.getAllAutomotiveCenters();
  }
}
