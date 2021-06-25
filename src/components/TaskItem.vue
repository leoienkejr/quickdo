<template>
    <div class="task-item px-10 pt-10 flex column">
        <div class="task-header flex column">
            <span class="task-title">Clean up bedroom</span>
            <span class="task-due">{{dueDateLocaleStr}}</span>
            
        </div>
        <div class="task-actions flex">
            <span class="mr-10">Delete </span>
            <span class="mr-10">Edit </span>
            <span class="mr-10">Done </span>
        </div>

    </div>
</template>

<script>
import {utils} from '@/utils/utils.js'

export default {
    name: 'TaskItem',
    data: () => ({
        utils: utils
    }),
    props: {
        task: {
            type: Object,
            default: () => ({
                dueUnixMilli: 1624491050000,
                completedAtUnixMilli: 1624476724000,
            })
        }
    },
    computed: {
        dueDateLocaleStr(){
            let date = new Date()
            date.setTime(this.task.dueUnixMilli)
            return date.toLocaleString(this.utils.getLocale(), )

        }
    }
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