// public class GeneratorPDF {
//   public static final Integer limitRecords = 10;
//   @AuraEnabled
//   public static Blob generatePdf() {
//     List<Account> records = [
//       SELECT ID, Name, AccountNumber, Match_Billing_Address__c
//       FROM Account
//       LIMIT :limitRecords
//     ];
//     String pdfText;
//     pdfText = '<HTML><BODY>';
//     pdfText = pdfText + '<H2>Account Records in PDF</H2>';
//     for (Integer i = 0; i < limitRecords; i++) {
//       pdfText =
//         pdfText +
//         ('<p>' +
//         records.get(i).ID +
//         '<&emsp>' +
//         records.get(i).Name +
//         '<&emsp>' +
//         records.get(i).AccountNumber +
//         '<&emsp>' +
//         records.get(i).Match_Billing_Address__c +
//         '<\br></p>');
//     }
//     pdfText = pdfText + '</BODY></HTML>';
//     System.debug(pdfText);

//     Blob pdfContent = Blob.toPdf(pdfText);
//     System.debug(pdfContent);
//     return pdfContent;
//   }
// }
