import { LightningElement, api } from "lwc";
import pdflib from "@salesforce/resourceUrl/jsPDF";
import { loadScript } from "lightning/platformResourceLoader";
import downloadPDFLabel from "@salesforce/label/c.Download_PDF";

export default class CreatePDF extends LightningElement {
  @api selectedCar;
  @api priceBYN;
  @api priceUSD;
  label = {
    downloadPDFLabel
  };
  renderedCallback() {
    loadScript(this, pdflib).then(() => {});
  }

  async createPdf() {
    const pdfDoc = await PDFLib.PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(
      PDFLib.StandardFonts.TimesRoman
    );

    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 12;
    const lineHeight = 16;
    let y = height - 50;
    page.drawText("Prices for " + this.selectedCar.Name, {
      x: 50,
      y: y,
      size: fontSize + 4,
      font: timesRomanFont,
      color: PDFLib.rgb(0, 0.53, 0.71)
    });
    y -= lineHeight;
    for (let i = 0; i < this.selectedCar.PricebookEntries.length; i++) {
      page.drawText(
        this.selectedCar.PricebookEntries[i].Pricebook2.Name +
          ": " +
          this.selectedCar.PricebookEntries[i].UnitPrice,
        {
          x: 50,
          y: y,
          size: fontSize,
          font: timesRomanFont,
          color: PDFLib.rgb(0, 0.6, 0.6)
        }
      );
      y -= lineHeight;
    }

    const pdfBytes = await pdfDoc.save();
    this.saveByteArray("Prices", pdfBytes);
  }
  saveByteArray(pdfName, byte) {
    var blob = new Blob([byte], { type: "application/pdf" });
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    var fileName = pdfName;
    link.download = fileName;
    link.click();
  }
}
