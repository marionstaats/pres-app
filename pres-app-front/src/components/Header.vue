<template>
    <header class="header">
        <h1>The Press App</h1>
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/register">Register</router-link>
        </div>
    </header>
</template>

<script>
export default {
    name: "Header"
}
</script>

<style scoped>
    .header {
        background-color: black;
        text-align: center;
        color: white;
        padding: 10px;
    }
    #nav a {
        padding-right: 5px;
        color: white;
        text-decoration: none;
    }
</style>