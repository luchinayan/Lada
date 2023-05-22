public with sharing class PDFGenerator {
  @AuraEnabled
  public static String generatePDF(String pdfContent) {
    Blob blobPDF = Blob.toPDF(pdfContent);

    String base64String = EncodingUtil.base64Encode(blobPDF);

    return base64String;
  }
}
