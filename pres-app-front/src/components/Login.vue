<template>
    <div>
        <FormulateForm class="register-form" v-model="formValues" @submit="handleSubmit" :form-errors="formErrors">
        <h2 class="form-title">Login</h2>
        <FormulateInput 
        name="username"
        label="Username" 
        validation="required" 
        />
        <FormulateInput
        type="password"
        name="password" 
        label="Password" 
        validation="required" 
        />
        <FormulateInput 
        type="submit" 
        label="Login" />
        </FormulateForm>
    </div>
</template>

<script>
import axios from 'axios';
const apiUrl = 'http://localhost:3000';

export default {
    name: 'Login',
    data: () => ({
        formValues: {},
        formErrors: [],
    }),
    methods: {
        async handleSubmit() {
            try {
                await axios.post(`${apiUrl}/api/login`, {username: this.formValues.username, password: this.formValues.password});
                //this.$router.push('dashboard'); 
            } catch (err) {
                switch (err.response.status) {
                    case 401:
                        this.formErrors = ['Invalid username or password.'];
                    return
                    }
                    this.formErrors = ['Sorry, an unexpected error ocurred. Please try again.'];
            }
        }
    }
}
</script>

<style scoped>
.register-form {
    padding: 2em;
    border: 1px solid black;
    border-radius: .5em;
    max-width: 500px;
    box-sizing: border-box;
}
.form-title {
    margin-top: 0;
}
.register-form::v-deep .formulate-input .formulate-input-element {
    max-width: none;
}

</style>