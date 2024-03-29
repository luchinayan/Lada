@isTest
private class ProductControllerTest {
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

  @isTest
  static void testGetAllProductsWithPrices() {
    List<Product2> result = ProductManager.getAllProductsWithPrices();

    Product2 testProduct = [
      SELECT Name, Transmission__c
      FROM Product2
      WHERE name = 'Test Product'
    ];

    System.assertEquals(
      testProduct.Name,
      result[0].Name,
      'Name field doesn\'t match'
    );

    System.assertEquals(
      testProduct.Transmission__c,
      result[0].Transmission__c,
      'Transmission__c field doesn\'t match'
    );

    System.assertNotEquals(0, result.size(), 'Size can not be 0');
  }
  @isTest
  static void testGetAllProductsWithPricesByName() {
    Product2 testProduct = [
      SELECT Name, Transmission__c
      FROM Product2
      WHERE name = 'Test Product'
    ];

    Product2 result = ProductManager.getProductsWithPricesByName(
      'Test Product'
    );

    System.assertEquals(
      testProduct.Name,
      result.Name,
      'Name field doesn\'t match'
    );

    System.assertEquals(
      testProduct.Transmission__c,
      result.Transmission__c,
      'Transmission__c field doesn\'t match'
    );
  }
}
