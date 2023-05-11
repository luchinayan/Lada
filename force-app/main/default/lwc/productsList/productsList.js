import getAllProducts from '@salesforce/apex/ProductController.getAllProducts';
import { LightningElement, wire } from 'lwc';

export default class ProductsList extends LightningElement {
    cars;
    selectedCar;
    isModalOpen = false;

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
        this.isModalOpen = true;
    }

    handleCloseModal() {
        this.isModalOpen = false;
    }
}
