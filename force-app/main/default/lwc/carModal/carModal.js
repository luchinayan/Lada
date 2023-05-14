import { LightningElement, api, track, wire } from "lwc";
import Year from "@salesforce/label/c.Year";
import Transmission from "@salesforce/label/c.Transmission";
import Body_Type from "@salesforce/label/c.Body_Type";
import Drive_Unit from "@salesforce/label/c.Drive_Unit";
import Equipment from "@salesforce/label/c.Equipment";
import Price from "@salesforce/label/c.Price";
import Close from "@salesforce/label/c.Close";
import getExchangeRate from "@salesforce/apex/ExRateHelper.getExchangeRate";
export default class CarModal extends LightningElement {
  @api selectedCar;
  @api isModalOpen;
  @track selectedCarPrice;
  Price = Price;
  Close = Close;
  Equipment = Equipment;
  Drive_Unit = Drive_Unit;
  Body_Type = Body_Type;
  Transmission = Transmission;
  Year = Year;
  selectedCurrency = "USD";
  currencyOptions = [
    { label: "USD", value: "USD" },
    { label: "BYN", value: "BYN" }
  ];
  @wire(getExchangeRate)
  exRates;

  handleChange(event) {
    // this.selectedCurrency = event.detail.value;
    this.selectedCarPrice =
      this.selectedCarPrice * this.exRates.data[0].Exchange_rate__c;
  }

  handleSelect() {
    this.selectedCarPrice =
      this.selectedCarPrice * this.exRates.data[0].Exchange_rate__c;
  }
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
