public with sharing class CaseController {
  @AuraEnabled
  public static void createCase(String email, String question) {
    Case newCase = new Case(
      Subject = 'Question from Site',
      Description = question,
      Status = 'New',
      Origin = 'Web',
      SuppliedEmail = email
    );
    insert newCase;
  }
}
