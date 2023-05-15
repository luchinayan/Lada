public with sharing class AutomotiveCentersManager {
  public static List<Automotive_Center__c> getAllAutomotiveCenters() {
    return [
      SELECT Address__c, City__c, Type__c, Phone__c
      FROM Automotive_Center__c
    ];
  }
}
