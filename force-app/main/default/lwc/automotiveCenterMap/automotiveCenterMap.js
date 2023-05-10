import { LightningElement, wire } from 'lwc';
import getAllAutomotiveCenters from '@salesforce/apex/AutomotiveCentersController.getAllAutomotiveCenters';

export default class AutomotiveCenterMap extends LightningElement {
    mapMarkers = [];
    @wire(getAllAutomotiveCenters)
    loadCenters(result) {
        if (result.data) {
            const centers = result.data;
            this.mapMarkers = centers.map((center) => {
                const Street = center.Address__c;
                const City = center.City__c;
                const Type = center.Type__c;
                const Phone = center.Phone__c
                return {
                    location: {
                        Street: Street,
                        City: City
                    },
                    title: Street,
                    description: `${Type}, ${Phone}`,
                    icon: 'utility:travel_and_places'
                };
            });
        } else if (result.error) {
            console.error(result.error);
        }
    }
}
