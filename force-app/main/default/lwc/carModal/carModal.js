import { LightningElement, api } from "lwc";

export default class CarModal extends LightningElement {
  @api selectedCar;
  @api isModalOpen;
  selectedCarPrice;
  renderedCallback() {
    if (this.selectedCar) {
      this.selectedCarPrice = this.selectedCar.PricebookEntries.find(
        (p) => p.Pricebook2.Name === this.selectedCar.eq__c
      ).UnitPrice;
    }
  }

  closeModal() {
    this.dispatchEvent(new CustomEvent("close"));
  }
}
