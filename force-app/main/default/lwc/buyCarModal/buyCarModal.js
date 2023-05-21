import { LightningElement, api, track } from "lwc";
import { createRecord } from "lightning/uiRecordApi";
import closeLabel from "@salesforce/label/c.Close";
import fullNameLabel from '@salesforce/label/c.Full_Name';
import submitApplicationLabel from '@salesforce/label/c.Submit_Application';
import LEAD_OBJECT from "@salesforce/schema/Lead";
import LEAD_FIRST_NAME_FIELD from "@salesforce/schema/Lead.FirstName";
import LEAD_LAST_NAME_FIELD from "@salesforce/schema/Lead.LastName";
import LEAD_EMAIL_FIELD from "@salesforce/schema/Lead.Email";
import LEAD_COMPANY_FIELD from "@salesforce/schema/Lead.Company";
import LEAD_SOURCE_FIELD from "@salesforce/schema/Lead.LeadSource";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class BuyCarModal extends LightningElement {
  @api isModalOpen;
  @track fullName;
  @track email;
  label = {
    closeLabel,
    fullNameLabel,
    submitApplicationLabel
  };
  handleNameChange(event) {
    this.fullName = event.target.value;
  }

  handleEmailChange(event) {
    this.email = event.target.value;
  }

  async handleSubmit() {
    const fields = {};
    fields[LEAD_FIRST_NAME_FIELD.fieldApiName] = this.fullName.split(" ")[0];
    fields[LEAD_LAST_NAME_FIELD.fieldApiName] = this.fullName.split(" ")[1];
    fields[LEAD_EMAIL_FIELD.fieldApiName] = this.email;
    fields[LEAD_COMPANY_FIELD.fieldApiName] = "Request car";
    fields[LEAD_SOURCE_FIELD.fieldApiName] = "Request buy car ";
    const recordInput = { apiName: LEAD_OBJECT.objectApiName, fields };

    createRecord(recordInput)
      .then((r) => {
        console.log(r);
        this.fullName = "";
        this.email = "";
        const event = new ShowToastEvent({
          title: 'Success',
          message: 'successfully',
          variant: 'success'
        });
        this.dispatchEvent(event);
      })

  }
  closeModal() {
    this.dispatchEvent(new CustomEvent("close"));
  }
}
