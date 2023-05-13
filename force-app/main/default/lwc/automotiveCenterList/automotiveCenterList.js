import getAllAutomotiveCenters from '@salesforce/apex/AutomotiveCentersController.getAllAutomotiveCenters';
import { LightningElement, wire } from 'lwc';

export default class AutomotiveCenterList extends LightningElement {
    centers;
    @wire(getAllAutomotiveCenters)
    loadCenters(result) {
        if (result.data) {
            this.centers = result.data;

        } else if (result.error) {
            console.error(result.error);
        }
    }



}