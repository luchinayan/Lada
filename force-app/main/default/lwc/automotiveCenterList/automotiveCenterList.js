import { LightningElement, wire } from "lwc";
import getAllAutomotiveCenters from "@salesforce/apex/AutomotiveCentersController.getAllAutomotiveCenters";
import dealerLabel from "@salesforce/label/c.Dealer";
import serviceLabel from "@salesforce/label/c.Service";

export default class AutomotiveCenterList extends LightningElement {
  centers;
  dealers = [];
  services = [];
  label = {
    dealerLabel,
    serviceLabel
  };
  @wire(getAllAutomotiveCenters)
  loadCenters({ data, error }) {
    if (data) {
      this.centers = data;
      for (let center of data) {
        if (center.Type__c === "Dealer") {
          this.dealers.push(center);
        } else if (center.Type__c === "Service") {
          this.services.push(center);
        }
      }
    } else if (error) {
      console.error(error);
    }
  }
}
