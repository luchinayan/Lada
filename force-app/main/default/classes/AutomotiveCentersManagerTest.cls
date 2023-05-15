@isTest
private class AutomotiveCentersManagerTest {
  @isTest
  static void testGetAllAutomotiveCenters() {
    List<Automotive_Center__c> centers = AutomotiveCenterTestDataFactory.createAutomotiveCenters(
      2
    );

    List<Automotive_Center__c> result = AutomotiveCentersManager.getAllAutomotiveCenters();

    System.assertEquals(2, result.size(), 'Expected 2 automotive centers');
    System.assertEquals(
      'Location 1',
      result[0].Address__c,
      'Incorrect center address'
    );
    System.assertEquals('City 2', result[1].City__c, 'Incorrect center city');
  }
}
