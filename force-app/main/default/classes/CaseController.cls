public with sharing class CaseController {
    @AuraEnabled
    public static void createCase(String name, String email, String question) {
        Contact newContact = new Contact(FirstName = name.split(' ')[0], LastName = name.split(' ')[1], Email = email);
        insert newContact;
        Case newCase = new Case(Subject = 'Question from Experience Cloud', Description = question, ContactId = newContact.Id, Status = 'New', Origin = 'Web');
        insert newCase;
    }
}
