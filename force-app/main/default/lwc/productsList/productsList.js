import getUSDExchangeRate from '@salesforce/apex/ExRateController.getUSDExchangeRate';
import getAllProducts from '@salesforce/apex/ProductController.getAllProducts';
import { LightningElement, wire } from 'lwc';

export default class ProductsList extends LightningElement {
    cars;
    selectedCar;
    isModalOpen = false;
    priceBYN;
    priceUSD;
    selectedCarPrice;
    exchangeRate;
    @wire(getUSDExchangeRate)
    loadRate(result) {
        if (result.data) {
            this.exchangeRate = result.data.Exchange_rate__c;

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

    handleOpenModal(event) {
        const carId = event.currentTarget.dataset.carId;
        this.selectedCar = this.cars.find((car) => car.Id === carId);
        this.selectedCarPrice = this.selectedCar.PricebookEntries.find(
            (p) => p.Pricebook2.Name === this.selectedCar.eq__c
        ).UnitPrice;
        this.priceUSD = this.selectedCarPrice;
        this.priceBYN = this.selectedCarPrice * this.exchangeRate;
        this.isModalOpen = true;
    }

    handleCloseModal() {
        this.isModalOpen = false;
    }
}
