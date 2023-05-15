import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createCase from '@salesforce/apex/CaseController.createCase';
import askQuestionLabel from '@salesforce/label/c.Ask_Question';
import questionLabel from '@salesforce/label/c.Question';
import submitLabel from '@salesforce/label/c.Submit';

export default class AskQuestion extends LightningElement {
    @track email = '';
    @track question = '';
    label = {
        askQuestionLabel,
        questionLabel,
        submitLabel,
    }


    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handleQuestionChange(event) {
        this.question = event.target.value;
    }

    handleSubmit() {
        createCase({ email: this.email, question: this.question })
            .then(() => {
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
