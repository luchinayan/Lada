import { LightningElement, api } from 'lwc';

export default class CarModal extends LightningElement {
    @api selectedCar;
    @api isModalOpen;

    closeModal() {
        this.dispatchEvent(new CustomEvent('close'));
    }
}
