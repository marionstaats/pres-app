<template>
    <div class="dash-board">
        <CurrentTasks v-bind:tasks="tasks" v-on:del-task="deleteTask"/>
        <Addtask />
    </div>
</template>

<script>
import Addtask from "../components/Addtask";
import CurrentTasks from "../components/CurrentTasks";
import axios from 'axios';

const apiUrl = 'http://localhost:3000'

export default {
    name: 'Dashboard',
    components: {
    Addtask,
    CurrentTasks
    },
    data() {
        return {
            tasks: []
        }
    },
    methods: {
        async deleteTask(_id) {
            try {
                await axios.post(`${apiUrl}/api/delete-task`, {_id: _id});
                this.tasks = this.tasks.filter(task => task._id !== _id)
            } catch(err){
                console.log(err)
            }
        }
    },
    async created() {
        try {
            const response = await axios.get(`${apiUrl}/api/tasks`);
            this.tasks = response.data ; 
        } catch(err) {
            console.log(err)
        }
    }
}
</script>

<style scoped>
.dash-board {
    display: flex;
    justify-content:space-around;
}
@media (max-width: 420px) {
    .dash-board {
        flex-direction: column;
    }
}
</style>