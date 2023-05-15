@IsTest
public class AutomotiveCenterTestDataFactory {
  public static List<Automotive_Center__c> createAutomotiveCenters(
    Integer numRecords
  ) {
    List<Automotive_Center__c> centers = new List<Automotive_Center__c>();

    for (Integer i = 1; i <= numRecords; i++) {
      Automotive_Center__c center = new Automotive_Center__c(
        Name = 'Center ' + i,
        Address__c = 'Location ' + i,
        Phone__c = '8044123123' + i,
        City__c = 'City ' + i
      );
      centers.add(center);
    }

    insert centers;
    return centers;
  }
}
