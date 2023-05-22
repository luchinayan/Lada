@isTest
private class CaseControllerTest {
  private static String TEST_EMAIL = 'test@example.com';
  private static String TEST_QUESTION = 'Test question';

  @isTest
  static void testCreateCase() {
    CaseController.createCase(TEST_EMAIL, TEST_QUESTION);

    Case createdCase = [
      SELECT Id, Subject, Description, Status, Origin, SuppliedEmail
      FROM Case
      WHERE SuppliedEmail = :TEST_EMAIL
    ];

    System.assertEquals(
      'Question from Site',
      createdCase.Subject,
      'Incorrect case subject'
    );
    System.assertEquals(
      TEST_QUESTION,
      createdCase.Description,
      'Incorrect case description'
    );
    System.assertEquals(
      TEST_EMAIL,
      createdCase.SuppliedEmail,
      'Incorrect case supplied email'
    );
  }
}
