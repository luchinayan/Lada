import { LightningElement, track, wire } from "lwc";
import { createRecord } from "lightning/uiRecordApi";
import LEAD_OBJECT from "@salesforce/schema/Lead";
import LEAD_FIRST_NAME_FIELD from "@salesforce/schema/Lead.FirstName";
import LEAD_LAST_NAME_FIELD from "@salesforce/schema/Lead.LastName";
import LEAD_EMAIL_FIELD from "@salesforce/schema/Lead.Email";
import LEAD_PHONE_FIELD from "@salesforce/schema/Lead.Phone";
import LEAD_SOURCE_FIELD from "@salesforce/schema/Lead.LeadSource";
import LEAD_PRODUCTINTEREST_FIELD from "@salesforce/schema/Lead.ProductInterest__c";
import getAllProductsAndPrices from "@salesforce/apex/ProductController.getAllProductsAndPrices";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import phoneLabel from "@salesforce/label/c.Phone";
import selectCarLabel from "@salesforce/label/c.Select_Car";
import dateLabel from "@salesforce/label/c.Date";
import carLabel from "@salesforce/label/c.Car";
import submitLabel from "@salesforce/label/c.Submit";
import fullNameLabel from "@salesforce/label/c.Full_Name";
import testDriveRequestFormLabel from "@salesforce/label/c.Test_Drive_Request_Form";
import successLabel from "@salesforce/label/c.Success";
import requestSendLabel from "@salesforce/label/c.Request_send";

export default class TestDriveForm extends LightningElement {
  cars;
  @track fullName;
  @track email;
  @track phone;
  @track preferredDate;
  @track preferredCar;
  label = {
    phoneLabel,
    dateLabel,
    submitLabel,
    fullNameLabel,
    testDriveRequestFormLabel,
    selectCarLabel,
    carLabel,
    successLabel,
    requestSendLabel
  };

  @wire(getAllProductsAndPrices)
  loadCars({ error, data }) {
    if (data) {
      this.cars = data;
    } else if (error) {
      console.error(error);
    }
  }
  handleNameChange(event) {
    this.fullName = event.target.value;
  }

  handleEmailChange(event) {
    this.email = event.target.value;
  }

  handlePhoneChange(event) {
    this.phone = event.target.value;
  }

  handlePreferredDateChange(event) {
    this.preferredDate = event.target.value;
  }

  handlePreferredCarChange(event) {
    this.preferredCar = event.target.value;
  }

  async handleSubmit() {
    const fields = {};
    fields[LEAD_FIRST_NAME_FIELD.fieldApiName] = this.fullName.split(" ")[0];
    fields[LEAD_LAST_NAME_FIELD.fieldApiName] = this.fullName.split(" ")[1];
    fields[LEAD_EMAIL_FIELD.fieldApiName] = this.email;
    fields[LEAD_PHONE_FIELD.fieldApiName] = this.phone;
    fields[LEAD_SOURCE_FIELD.fieldApiName] = "Request Test Drive";
    fields[LEAD_PRODUCTINTEREST_FIELD.fieldApiName] = this.preferredCar;

    const recordInput = { apiName: LEAD_OBJECT.objectApiName, fields };
    createRecord(recordInput)
      .then(() => {
        this.fullName = "";
        this.email = "";
        this.phone = "";
        this.preferredDate = "";
        const selectElement = this.template.querySelector(".slds-select");
        selectElement.selectedIndex = 0;
        const event = new ShowToastEvent({
          title: this.label.successLabel,
          message: this.label.requestSendLabel,
          variant: "success"
        });
        this.dispatchEvent(event);
      })
      .catch((error) => {
        const event = new ShowToastEvent({
          title: "Error",
          message: error.body.message,
          variant: "error"
        });
        this.dispatchEvent(event);
      });
  }
}
