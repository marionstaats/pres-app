<template>
    <div class="register-form">
        <h3>Current Tasks</h3>
        <div v-bind:key="task._id" v-for="task in tasks">
            <Task v-bind:task="task" v-on:del-task="$emit('del-task', task._id)" />
        </div>

    </div>
</template>

<script>
import Task from './Task';

export default {
    name: 'CurrentTasks',
    components: {
        Task
    },
    props: ["tasks"]
}
</script>