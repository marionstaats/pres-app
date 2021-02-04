<template>
  <div>
    <FormulateForm class="register-form" v-model="formValues" @submit="handleSubmit" 
      :form-errors="formErrors">
      <h2 class="form-title">Register</h2>
      <FormulateInput 
        name="username"
        label="Username" 
        validation="required|min:3" 
      />
      <FormulateInput 
        name="email" 
        label="Email" 
        validation="required|email" 
      />
      <div class="double-wide">
        <FormulateInput
          type="password"
          name="password" 
          label="Password" 
          validation="required|min:5"
        />
        <FormulateInput
          type="password"
          name="password_confirm" 
          label="Confirm your password" 
          validation="required|confirm"
          validation-name="Confirmation" 
        />
      </div>
      <FormulateInput
        name="sortUser"
        label="What type of user are you?"
        validation="required" 
        type="radio"
        :options="{user: 'User', shopper: 'Shopper'}"
      />
      <FormulateInput
        name="acceptTerms"
        type="checkbox"
        label="Accepts Terms"
        validation="required"/>
      <FormulateInput 
        type="submit" 
        label="Sign up" />
    </FormulateForm>

  </div>
</template>

<script>
import axios from 'axios';
const apiUrl = 'http://localhost:3000'

export default {
  name: 'Register',
  data: () => ({
    formValues: {},
    formErrors: [],
  }),
  methods: {
    async handleSubmit() {
        try {
            await axios.post(`${apiUrl}/api/register`, {username: this.formValues.username, email: this.formValues.email, password: this.formValues.password, sortUser: this.formValues.sortUser});
            this.$router.push('dashboard'); 
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
</style>