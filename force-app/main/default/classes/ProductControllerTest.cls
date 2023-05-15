@isTest
private class ProductControllerTest {
  @isTest
  static void testGetAllProducts() {
    Id standardPricebookId = Test.getStandardPricebookId();

    Product2 product = new Product2(
      Name = 'Car 1',
      Family = 'Cars',
      Car_Body__c = 'Sedan',
      Drive_Unit__c = 'Front-wheel drive',
      eq__c = 'Electric',
      Transmission__c = 'Automatic',
      Year__c = '2022'
    );
    insert product;

    PricebookEntry pricebookEntry = new PricebookEntry(
      Product2Id = product.Id,
      Pricebook2Id = standardPricebookId,
      UnitPrice = 50000,
      UseStandardPrice = false
    );
    insert pricebookEntry;

    List<Product2> result = ProductController.getAllProducts();

    System.assertEquals(1, result.size(), 'Incorrect number of products');
    Product2 returnedProduct = result[0];
    System.assertEquals(
      product.Name,
      returnedProduct.Name,
      'Incorrect product name'
    );
    System.assertEquals(
      product.Car_Body__c,
      returnedProduct.Car_Body__c,
      'Incorrect car body'
    );
    System.assertEquals(
      product.Drive_Unit__c,
      returnedProduct.Drive_Unit__c,
      'Incorrect drive unit'
    );
    System.assertEquals(
      product.Year__c,
      returnedProduct.Year__c,
      'Incorrect year'
    );

    System.assertEquals(
      1,
      returnedProduct.PricebookEntries.size(),
      'Incorrect number of pricebook entries'
    );
    PricebookEntry returnedPricebookEntry = returnedProduct.PricebookEntries[0];
    System.assertEquals(
      pricebookEntry.UnitPrice,
      returnedPricebookEntry.UnitPrice,
      'Incorrect unit price'
    );
  }
}
