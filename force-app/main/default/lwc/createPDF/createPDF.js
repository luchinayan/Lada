import { LightningElement, api, wire } from "lwc";
import generatePDF from "@salesforce/apex/PDFGenerator.generatePDF";
import downloadPDFLabel from "@salesforce/label/c.Download_PDF";
import getProductsWithPricesByName from "@salesforce/apex/ProductController.getProductsWithPricesByName";

export default class CreatePDF extends LightningElement {
  @api selectedCar;
  @api selectedCurrency;
  @api exchangeRate;
  label = {
    downloadPDFLabel
  };
  @wire(getProductsWithPricesByName, { name: "$selectedCar.Name" })
  productWithPrices;
  async createPdf() {
    let pdfContent = `Prices for ${this.selectedCar.Name}:`;
    if (this.selectedCurrency === "USD") {
      for (let price of this.productWithPrices.data.PricebookEntries) {
        pdfContent += `<br></br> ${price.Pricebook2.Name}  ${price.UnitPrice}  ${this.selectedCurrency}`;
      }
    } else {
      for (let price of this.productWithPrices.data.PricebookEntries) {
        pdfContent += `<br></br> ${price.Pricebook2.Name} ${(
          price.UnitPrice * this.exchangeRate
        ).toFixed(1)}  ${this.selectedCurrency}`;
      }
    }

    const pdf = await generatePDF({ pdfContent });

    const fileName = "Prices.pdf";

    const link = document.createElement("a");
    link.href = "data:application/pdf;base64," + pdf;
    link.download = fileName;
    link.click();
  }
}
