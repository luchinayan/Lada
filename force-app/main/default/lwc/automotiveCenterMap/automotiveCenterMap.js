import { LightningElement, wire } from 'lwc';
import getAllAutomotiveCenters from '@salesforce/apex/AutomotiveCentersController.getAllAutomotiveCenters';
import phoneLabel from '@salesforce/label/c.Phone';

export default class AutomotiveCenterMap extends LightningElement {
    mapMarkers = [];
    label = {
        phoneLabel
    }
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
                    description: `${Type},${PhoneText}: ${Phone}`,
                    icon: 'utility:travel_and_places',
                    recordId: center.Id
                };
            });
        } else if (result.error) {
            console.error(result.error);
        }
    }


}
