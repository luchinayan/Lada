import { LightningElement, api } from 'lwc';
import addressLabel from '@salesforce/label/c.Address';
import cityLabel from '@salesforce/label/c.City';
import phoneLabel from '@salesforce/label/c.Phone';
export default class AutomotiveCenterDetails extends LightningElement {
    @api center;

    label = {
        addressLabel,
        cityLabel,
        phoneLabel
    }
}