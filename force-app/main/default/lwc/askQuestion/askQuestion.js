import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createCase from '@salesforce/apex/CaseController.createCase';

export default class AskQuestion extends LightningElement {
    @track name = '';
    @track email = '';
    @track question = '';

    handleNameChange(event) {
        this.name = event.target.value;
    }

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handleQuestionChange(event) {
        this.question = event.target.value;
    }

    handleSubmit() {
        createCase({ name: this.name, email: this.email, question: this.question })
            .then(() => {
                this.name = '';
                this.email = '';
                this.question = '';
                const event = new ShowToastEvent({
                    title: 'Success',
                    message: 'Case created successfully',
                    variant: 'success'
                });
                this.dispatchEvent(event);
            })
            .catch(error => {
                const event = new ShowToastEvent({
                    title: 'Error',
                    message: error.body.message,
                    variant: 'error'
                });
                this.dispatchEvent(event);
            });
    }
}
