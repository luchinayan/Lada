import { LightningElement, api, track } from "lwc";
import yearLabel from "@salesforce/label/c.Year";
import transmissionLabel from "@salesforce/label/c.Transmission";
import bodyTypeLabel from "@salesforce/label/c.Body_Type";
import driveUnitLabel from "@salesforce/label/c.Drive_Unit";
import equipmentLabel from "@salesforce/label/c.Equipment";
import priceLabel from "@salesforce/label/c.Price";
import closeLabel from "@salesforce/label/c.Close";
import selectCurrencyLabel from "@salesforce/label/c.Select_Currency";

export default class CarModal extends LightningElement {
  @api selectedCar;
  @api isModalOpen;
  @api priceBYN;
  @api priceUSD;
  @track selectedCarPrice;
  isFirstTime = true;
  selectedCurrency = "USD";
  currencyOptions = [
    { label: "USD", value: "USD" },
    { label: "BYN", value: "BYN" }
  ];
  label = {
    yearLabel,
    transmissionLabel,
    bodyTypeLabel,
    driveUnitLabel,
    equipmentLabel,
    priceLabel,
    closeLabel,
    selectCurrencyLabel
  };
  renderedCallback() {
    if (this.isModalOpen && this.isFirstTime) {
      this.isFirstTime = false;
      this.selectedCarPrice = this.priceUSD;
    }
  }
  handleChange(event) {
    const selectedCurrency = event.target.value;
    if (selectedCurrency === "BYN") {
      this.selectedCarPrice = this.priceBYN;
    } else {
      this.selectedCarPrice = this.priceUSD;
    }
  }

  closeModal() {
    this.isFirstTime = true;
    this.dispatchEvent(new CustomEvent("close"));
  }
}
