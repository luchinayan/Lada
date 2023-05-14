public class ExchangeRateUpdater {
  private static final String API_URL = 'https://api.nbrb.by/exrates/rates/431';
  @AuraEnabled
  @future(callout=true)
  public static void updateExchangeRate() {
    Http http = new Http();
    HttpRequest request = new HttpRequest();
    request.setEndpoint(API_URL);
    request.setMethod('GET');
    HttpResponse response = http.send(request);

    if (response.getStatusCode() == 200) {
      Map<String, Object> result = (Map<String, Object>) JSON.deserializeUntyped(
        response.getBody()
      );

      String currencyAbbreviation = (String) result.get('Cur_Abbreviation');
      Decimal exchangeRate = (Decimal) result.get('Cur_OfficialRate');

      List<ExRate__c> exchangeRateRecords = [
        SELECT Id, Exchange_Rate__c, Date_of_the_exchange_rate__c
        FROM ExRate__c
        WHERE Name = :currencyAbbreviation
        LIMIT 1
      ];

      ExRate__c exchangeRateRecord;
      if (exchangeRateRecords.size() > 0) {
        exchangeRateRecord = exchangeRateRecords[0];
        exchangeRateRecord.Date_of_the_exchange_rate__c = Date.today();
      } else {
        exchangeRateRecord = new ExRate__c();
        exchangeRateRecord.Name = currencyAbbreviation;
        exchangeRateRecord.Date_of_the_exchange_rate__c = Date.today();
      }

      exchangeRateRecord.Exchange_Rate__c = exchangeRate;
      update exchangeRateRecord;
    }
  }
}
