@isTest
private class AutomotiveCentersControllerTest {
  @isTest
  static void testGetAllAutomotiveCenters() {
    List<Automotive_Center__c> centers = AutomotiveCenterTestDataFactory.createAutomotiveCenters(
      3
    );

    List<Automotive_Center__c> result = AutomotiveCentersController.getAllAutomotiveCenters();

    System.assertEquals(3, result.size(), 'Expected 3 automotive centers');
    System.assertEquals('City 2', result[1].City__c, 'Incorrect center city');
    System.assertEquals(
      'Location 2',
      result[1].Address__c,
      'Incorrect center address'
    );
  }
}
