import { LightningElement, api } from "lwc";
import Year from '@salesforce/label/c.Year';
import Transmission from '@salesforce/label/c.Transmission';
import Body_Type from '@salesforce/label/c.Body_Type';
import Drive_Unit from '@salesforce/label/c.Drive_Unit';
import Equipment from '@salesforce/label/c.Equipment';
import Price from '@salesforce/label/c.Price';
import Close from '@salesforce/label/c.Close';
export default class CarModal extends LightningElement {
    @api selectedCar;
    @api isModalOpen;
    selectedCarPrice;
    Price = Price;
    Close = Close;
    Equipment = Equipment;
    Drive_Unit = Drive_Unit;
    Body_Type = Body_Type;
    Transmission = Transmission;
    Year = Year;

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
