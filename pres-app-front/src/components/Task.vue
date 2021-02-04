<template>
    <div class="task-item">
        <p>Name receiver: {{task.nameReceiver}}</p>
        <p>Occasion: {{task.occasion}}</p>
        <p>Budget: €{{task.budget}},-</p>
        <button @click="$emit('del-task', task._id)" class="del">Delete</button>
    </div>
</template>

<script>
export default {
    name: "Task",
    props: ["task"]   
}
</script>

<style scoped>
    .task-item {
        background-color: rgb(129, 224, 161);
        padding: 10px;
        margin: 10px;
        border: 1px solid black;
        min-width: 280px;
        border-radius: .5em;
    }
    .del {
        background-color: red;
        padding: 5px;
        cursor: pointer;
        font-weight: bold;
        min-width: 280px;
        margin: 10px;
    }
</style>