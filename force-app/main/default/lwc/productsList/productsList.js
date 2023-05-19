import getUSDExchangeRate from "@salesforce/apex/ExRateController.getUSDExchangeRate";
import getAllProducts from "@salesforce/apex/ProductController.getAllProducts";
import { LightningElement, wire } from "lwc";
import showDetails from "@salesforce/label/c.Show_Details";
import submitApplicationLabel from "@salesforce/label/c.Submit_Application";

export default class ProductsList extends LightningElement {
  cars;
  selectedCar;
  isCarModalOpen = false;
  isBuyCarModalOpen = false;
  priceBYN;
  priceUSD;
  selectedCarPrice;
  exchangeRate;
  label = {
    showDetails,
    submitApplicationLabel
  };
  @wire(getUSDExchangeRate)
  loadRate(result) {
    if (result.data) {
      this.exchangeRate = result.data[0].Exchange_rate__c;
    }
  }

  @wire(getAllProducts)
  loadCars({ error, data }) {
    if (data) {
      this.cars = data;
    } else if (error) {
      console.error(error);
    }
  }

  handleOpenBuyCarModal() {
    this.isBuyCarModalOpen = true;
  }
  handleOpenCarModal(event) {
    const carId = event.currentTarget.dataset.carId;
    this.selectedCar = this.cars.find((car) => car.Id === carId);
    this.selectedCarPrice = this.selectedCar.PricebookEntries.find(
      (p) => p.Pricebook2.Name === this.selectedCar.eq__c
    ).UnitPrice;
    this.priceUSD = this.selectedCarPrice;

    this.priceBYN = this.selectedCarPrice * this.exchangeRate;
    this.isCarModalOpen = true;
  }

  handleCloseCarModal() {
    this.isCarModalOpen = false;
  }
  handleCloseBuyCarModal() {
    this.isBuyCarModalOpen = false;
  }
}
