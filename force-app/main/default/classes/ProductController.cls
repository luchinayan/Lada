public with sharing class ProductController {
  @AuraEnabled(cacheable=true)
  public static List<Product2> getAllProductsAndPrices() {
    return ProductManager.getAllProductsWithPrices();
  }
  @AuraEnabled(cacheable=true)
  public static Product2 getProductsWithPricesByName(String name) {
    return ProductManager.getProductsWithPricesByName(name);
  }
}
