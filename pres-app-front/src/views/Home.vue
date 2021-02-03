<template>
  <div class="home-page">
    <Register />
    <Login />
  </div>
</template>

<script>
import Register from "../components/Register";
import Login from "../components/Login";

export default {
  name: 'Home',
  components: {
    Register,
    Login
  }
}
</script>

<style scoped>
.home-page {
  display: flex;
  justify-content: space-around;
  padding: 20px;
}
</style>