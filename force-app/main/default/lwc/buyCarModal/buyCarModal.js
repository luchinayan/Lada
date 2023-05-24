import { LightningElement, api, track } from "lwc";
import { createRecord } from "lightning/uiRecordApi";
import closeLabel from "@salesforce/label/c.Close";
import fullNameLabel from "@salesforce/label/c.Full_Name";
import submitApplicationLabel from "@salesforce/label/c.Submit_Application";
import successLabel from "@salesforce/label/c.Success";
import requestSendLabel from "@salesforce/label/c.Request_send";
import LEAD_OBJECT from "@salesforce/schema/Lead";
import LEAD_FIRST_NAME_FIELD from "@salesforce/schema/Lead.FirstName";
import LEAD_LAST_NAME_FIELD from "@salesforce/schema/Lead.LastName";
import LEAD_EMAIL_FIELD from "@salesforce/schema/Lead.Email";
import LEAD_SOURCE_FIELD from "@salesforce/schema/Lead.LeadSource";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import LEAD_PRODUCTINTEREST_FIELD from "@salesforce/schema/Lead.ProductInterest__c";

export default class BuyCarModal extends LightningElement {
  @api isModalOpen;
  @api selectedCar;
  @track fullName;
  @track email;

  label = {
    closeLabel,
    fullNameLabel,
    submitApplicationLabel,
    successLabel,
    requestSendLabel
  };
  handleNameChange(event) {
    this.fullName = event.target.value;
  }

  handleEmailChange(event) {
    this.email = event.target.value;
  }

  handleSubmit() {
    const fields = {};
    fields[LEAD_FIRST_NAME_FIELD.fieldApiName] = this.fullName.split(" ")[0];
    fields[LEAD_LAST_NAME_FIELD.fieldApiName] = this.fullName.split(" ")[1];
    fields[LEAD_EMAIL_FIELD.fieldApiName] = this.email;
    fields[LEAD_SOURCE_FIELD.fieldApiName] = "Request buy car";
    const recordInput = { apiName: LEAD_OBJECT.objectApiName, fields };
    fields[LEAD_PRODUCTINTEREST_FIELD.fieldApiName] = this.selectedCar.Name;

    createRecord(recordInput).then(() => {
      this.fullName = "";
      this.email = "";
      const event = new ShowToastEvent({
        title: this.label.successLabel,
        message: this.label.requestSendLabel,
        variant: "success"
      });
      this.dispatchEvent(event);
    });
  }
  closeModal() {
    this.dispatchEvent(new CustomEvent("close"));
  }
}
