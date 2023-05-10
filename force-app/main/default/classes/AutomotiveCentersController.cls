public class AutomotiveCentersController {
  @AuraEnabled(cacheable=true)
  public static List<Automotive_Center__c> getAllAutomotiveCenters() {
    try {
      return [
        SELECT Address__c, City__c, Name, Type__c, Phone__c
        FROM Automotive_Center__c
      ];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}
