<template>
  <div>
    <FormulateForm class="login-form" v-model="formValues" @submit="handleSubmit" 
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
.login-form {
  padding: 2em;
  border: 1px solid #a8a8a8;
  border-radius: .5em;
  max-width: 500px;
  box-sizing: border-box;
}
.form-title {
  margin-top: 0;
}
.login-form::v-deep .formulate-input .formulate-input-element {
  max-width: none;
}
@media (min-width: 420px) {
  .double-wide {
    display: flex;
  }
  .double-wide .formulate-input {
    flex-grow: 1;
    width: calc(50% - .5em);
  }
  .double-wide .formulate-input:first-child {
    margin-right: .5em;
  }
  .double-wide .formulate-input:last-child {
    margin-left: .5em;
  }
}
</style>