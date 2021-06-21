<template>
    <div class="task-item px-10 pt-10 flex column">
        <div class="task-header flex column">
            <span class="task-title">Clean up bedroom</span>
            <span class="task-due">14/06/2021 23:43</span>
            
        </div>
        <div class="task-actions flex">
            <span class="mr-10">Delete </span>
            <span class="mr-10">Edit </span>
            <span class="mr-10">Done </span>
        </div>

    </div>
</template>

<script>
export default {
    name: 'TaskItem'
}
</script>

<style scoped>
    .task-title {
        font-size: 18px;          
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .task-due {
        font-size: 14px;
        font-weight: 200;
    }

    .task-item {
        height: 110px;
        background: lightgrey;
        border-radius: 0 5px 5px 0;

    }

    .task-header {
        height: 70%;
        max-width: 100%;
        overflow: hidden;
    }

    .task-actions {
        justify-content: flex-end;
    }
</style>