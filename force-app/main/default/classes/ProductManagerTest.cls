@IsTest
public with sharing class ProductManagerTest {
  @TestSetup
  static void makeProduct() {
    Product2 testProduct = new Product2(
      Name = 'Test Product',
      Year__c = '2023',
      Transmission__c = 'Manual',
      Drive_Unit__c = 'FWD',
      Car_Body__c = 'Liftback',
      Family = 'Cars'
    );
    insert testProduct;

    Pricebook2 standardPricebook = new Pricebook2(
      Id = Test.getStandardPricebookId(),
      IsActive = true
    );

    update standardPricebook;

    standardPricebook = [
      SELECT Id, IsStandard
      FROM Pricebook2
      WHERE Id = :standardPricebook.Id
    ];

    PricebookEntry pbe = new PricebookEntry(
      Pricebook2Id = standardPricebook.Id,
      Product2Id = testProduct.Id,
      UnitPrice = 1020,
      IsActive = true
    );
    insert pbe;
  }
  @IsTest
  static void testGetAllProductsWithPrices() {
    List<Product2> result = ProductManager.getAllProductsWithPrices();

    System.assertEquals(1, result.size(), 'Expected 1 product');

    Product2 testProduct = [
      SELECT Name, Transmission__c
      FROM Product2
      WHERE name = 'Test Product'
    ];

    System.assertEquals(
      'Test Product',
      result[0].Name,
      'Name field should match'
    );
  }

  @IsTest
  static void testGetProductsWithPricesByName() {
    Product2 result = ProductManager.getProductsWithPricesByName(
      'Test Product'
    );

    Product2 testProduct = [
      SELECT Name, Transmission__c
      FROM Product2
      WHERE name = 'Test Product'
    ];

    System.assertEquals('Test Product', result.Name, 'Name field should match');
  }
}
