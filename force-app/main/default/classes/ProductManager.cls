public with sharing class ProductManager {
  public static List<Product2> getAllProductsWithPrices() {
    return [
      SELECT
        Name,
        Car_Body__c,
        Img_Url__c,
        Drive_Unit__c,
        eq__c,
        Transmission__c,
        Year__c,
        (
          SELECT Pricebook2Id, UnitPrice, Pricebook2.Name, UseStandardPrice
          FROM PricebookEntries
          WHERE Pricebook2.IsStandard = FALSE
        )
      FROM Product2
      WHERE Family = 'Cars'
    ];
  }
  public static Product2 getProductsWithPricesByName(String name) {
    return [
      SELECT
        Name,
        Car_Body__c,
        Img_Url__c,
        Drive_Unit__c,
        eq__c,
        Transmission__c,
        Year__c,
        (
          SELECT Pricebook2Id, UnitPrice, Pricebook2.Name, UseStandardPrice
          FROM PricebookEntries
          WHERE Pricebook2.IsStandard = FALSE
        )
      FROM Product2
      WHERE Family = 'Cars' AND Name = :name
    ];
  }
}
