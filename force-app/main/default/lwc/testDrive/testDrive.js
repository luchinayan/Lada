import { LightningElement, track, wire } from "lwc";
import { createRecord } from "lightning/uiRecordApi";
import LEAD_OBJECT from "@salesforce/schema/Lead";
import LEAD_FIRST_NAME_FIELD from "@salesforce/schema/Lead.FirstName";
import LEAD_LAST_NAME_FIELD from "@salesforce/schema/Lead.LastName";
import LEAD_EMAIL_FIELD from "@salesforce/schema/Lead.Email";
import LEAD_COMPANY_FIELD from "@salesforce/schema/Lead.Company";
import LEAD_PHONE_FIELD from "@salesforce/schema/Lead.Phone";
import LEAD_SOURCE_FIELD from "@salesforce/schema/Lead.LeadSource";
import getAllProducts from "@salesforce/apex/ProductController.getAllProducts";
import Phone from '@salesforce/label/c.Phone';
import Date from '@salesforce/label/c.Date';
import Submit from '@salesforce/label/c.Submit';
import Full_Name from '@salesforce/label/c.Full_Name';
import Test_Drive_Request_Form from '@salesforce/label/c.Test_Drive_Request_Form';

export default class TestDriveForm extends LightningElement {
  cars;
  @track fullName = "";
  @track email = "";
  @track phone = "";
  @track preferredDate = "";
  @track preferredCar = "";
  Phone = Phone;
  Full_Name = Full_Name;
  Date = Date;
  Submit = Submit;
  Test_Drive_Request_Form = Test_Drive_Request_Form;

  @wire(getAllProducts)
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
    fields[LEAD_COMPANY_FIELD.fieldApiName] = "TEST DRIVE";
    fields[LEAD_SOURCE_FIELD.fieldApiName] = "Test Drive Request";

    const recordInput = { apiName: LEAD_OBJECT.objectApiName, fields };
    createRecord(recordInput)
      .then(() => {
        this.fullName = "";
        this.email = "";
        this.phone = "";
        this.preferredDate = "";
        this.preferredCar = "";
        this.showToast(
          "success",
          "Success!",
          "Your test drive request has been submitted."
        );
      })
      .catch((error) => {
        this.showToast("error", "Error", error.body.message);
      });
  }
}
