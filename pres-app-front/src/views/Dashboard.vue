<template>
    <div>
        <h2>The Dashboard</h2>
        <Addtask />
    </div>
</template>

<script>
import Addtask from "../components/Addtask";

export default {
    name: 'Dashboard',
    components: {
    Addtask
    }

}
</script>