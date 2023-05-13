import { LightningElement, api } from 'lwc';
import Address from '@salesforce/label/c.Address';
import City from '@salesforce/label/c.City';
import Phone from '@salesforce/label/c.Phone';
export default class AutomotiveCenterDetails extends LightningElement {
    @api center;
    Address = Address;
    City = City;
    Phone = Phone;

}