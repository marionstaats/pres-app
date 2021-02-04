<template>
    <div id='addtask' class='add-task'>
    <FormulateForm class="register-form" v-model="formValues" @submit="handleSubmit" :form-errors="formErrors">
    <h3 class="form-title">Add a new Task</h3>
    <FormulateInput 
        name="relationship"
        label="Relationship with the receiver" 
        validation="required" 
    />
    <div class="double-wide">
    <FormulateInput 
        name="nameReceiver" 
        label="Name of the receiver" 
        validation="required" 
    />
    <FormulateInput
        name="genderReceiver"
        label="What gender is the receiver?"
        validation="required" 
        type="radio"
        :options="{man: 'Man', female: 'Female', notSpec: 'Other'}"
    />
    </div>
    <div class="double-wide">
    <FormulateInput
        type="date"
        name="dateDelivery" 
        label="Max date of the delivery" 
        validation="required" 
    />
    <FormulateInput 
        name="placeDelivery" 
        label="Place of delivery" 
        validation="required" 
    />
    </div>
    <div class="double-wide">
    <FormulateInput 
        name="occasion" 
        label="Occasion" 
        validation="required"
    />
    <FormulateInput 
        type="number"
        name="budget" 
        label="Budget for the present" 
        validation="required"
        min="0" 
    />
    </div>
    <FormulateInput
        name="wrapped"
        type="checkbox"
        label="Do you want the present to be wrapped?"
    />
    <FormulateInput
        name="postcard"
        type="checkbox"
        label="Do you want an additional postcard?"
    />
    <FormulateInput
        name="approvalNeeded"
        type="checkbox"
        label="Do you want to manually accept the present?"
    />
    <FormulateInput
        name="acceptAnyUser"
        type="checkbox"
        label="Do you want to manually accept the shopper?"
    />
    <h4>Optional fields:</h4>
    <FormulateInput 
        name="interestsReceiver" 
        v-model="interestsReceiverValue"
        label="What are the receiver's interests?"
        type="textarea"
        validation="max:50,length"
        error-behavior="live"
        :help="`Keep it under 50 characters. ${50 - interestsReceiverValue.length} left.`" 
    />
    <FormulateInput 
        name="suggestions"
        v-model="suggestionsValue" 
        label="Do you have any suggestions?"
        type="textarea"
        validation="max:50,length"
        error-behavior="live"
        :help="`Keep it under 50 characters. ${50 - suggestionsValue.length} left.`" 
    />
    <FormulateInput 
        name="notBuy"
        v-model="notBuyValue" 
        label="What should the shopper definitely not buy?"
        type="textarea"
        validation="max:50,length"
        error-behavior="live"
        :help="`Keep it under 50 characters. ${50 - notBuyValue.length} left.`" 
    />
    <FormulateInput 
        name="note"
        v-model="noteValue" 
        label="Do you have any extra comments?"
        type="textarea"
        validation="max:50,length"
        error-behavior="live"
        :help="`Keep it under 50 characters. ${50 - noteValue.length} left.`" 
    />
    <FormulateInput 
        type="submit" 
        label="Add your new task" 
    />
    </FormulateForm>

    </div>
</template>

<script>
import axios from 'axios';
const apiUrl = 'http://localhost:3000'

export default {
    name: 'Addtask',
    data: () => ({
        formValues: {},
        formErrors: [],
        interestsReceiverValue: '',
        suggestionsValue: '',
        notBuyValue: '',
        noteValue: '',
    }),
    methods: {
    async handleSubmit() {
        try {
            await axios.post(`${apiUrl}/api/add-task`, {
                relationship: this.formValues.relationship,
                nameReceiver: this.formValues.nameReceiver,
                genderReceiver: this.formValues.genderReceiver,
                occasion: this.formValues.occasion,
                dateDelivery: this.formValues.dateDelivery,
                placeDelivery: this.formValues.placeDelivery,
                budget: this.formValues.budget,
                wrapped: this.formValues.wrapped,
                postcard: this.formValues.postcard,
                approvalNeeded: this.formValues.approvalNeeded,
                acceptAnyUser: this.formValues.acceptAnyUser,
                suggestions: this.formValues.suggestions,
                notBuy: this.formValues.notBuy,
                interestsReceiver: this.formValues.interestsReceiver,
                note: this.formValues.note
                });

            this.formValues = {};
        } catch(err) {
            switch (err.response.status) {
            case 401:
                this.formErrors = [err.response.data.message]
                return
            }
            this.formErrors = ['Sorry, an unexpected error ocurred. Please try again.'];
            }     
        }
    }
}
</script>

<style scoped>
.add-task{
    margin-bottom: 40px;
}
</style>