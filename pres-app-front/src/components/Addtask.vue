<template>
    <div id='addtask'>
    <h3>Add a new Task</h3>
    <FormulateForm v-model="formValues" @submit="handleSubmit" 
        :form-errors="formErrors">
    <FormulateInput 
        name="relationship"
        label="Relationship" 
        validation="required" 
    />
    <FormulateInput 
        name="nameReceiver" 
        label="Name of the receiver" 
        validation="required" 
    />
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
    <FormulateInput
        name="genderReceiver"
        label="What gender is the receiver?"
        validation="required" 
        type="radio"
        :options="{man: 'Man', female: 'Female', notSpec: 'Not Specified'}"
    />
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
    />
    <FormulateInput
        name="approvalNeeded"
        type="checkbox"
        label="Do you want to manually accept the shopper?"
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
    }),
    methods: {
    async handleSubmit() {
        try {
            await axios.post(`${apiUrl}/api/add-task`, {relationship: this.formValues.relationship});
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
#addtask {
    border: 1px solid black;
    width: 50%;
    margin: auto;
}
</style>