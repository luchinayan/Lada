@isTest
private class PDFGeneratorTest {
  @isTest
  static void testPDFGenerator() {
    String testPDFContent = 'Test PDF Content';

    Test.startTest();
    String base64String = PDFGenerator.generatePDF(testPDFContent);
    Test.stopTest();

    System.assertNotEquals(
      null,
      base64String,
      'Base64 string should not be null'
    );
    Blob decodedBlob = EncodingUtil.base64Decode(base64String);

    System.assertNotEquals(
      null,
      decodedBlob,
      'Decoded Blob should not be null'
    );
 

  }
}
