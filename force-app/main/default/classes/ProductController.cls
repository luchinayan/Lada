public with sharing class ProductController {
  @AuraEnabled(cacheable=true)
  public static List<Product2> getAllProducts() {
    return [
      SELECT
        Id,
        Car_Body__c,
        Drive_Unit__c,
        eq__c,
        Name,
        Transmission__c,
        Year__c
      FROM Product2
      WHERE Family = 'Cars'
    ];
  }
}
